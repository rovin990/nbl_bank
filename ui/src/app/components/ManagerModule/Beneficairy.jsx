import React, { useState,useEffect } from "react";
import axiosInstance from "../../../interceptors";
import { HttpStatusCode } from "axios";
import {useNavigate} from "react-router-dom"

import {ENVConstant} from "../../enviroments/Constant";
import {APPConstant} from "../../constant/APPConstant";
import { URLConstant } from "../../constant/URLConstant";
import Header from "../Header";



function Beneficiary(){
    const navigate = useNavigate();
    const [beneficiaries,setBeneficiaries] = useState([]);
    const [isRemarkEdit,setIsRemarkEdit] = useState(false);
    const [remark,setRemark] = useState("");
    const [msg,setMsg] = useState(false);


    async function getBeneficiaries(){
        try {
            const beneficiaryPendingResponse = await axiosInstance.get(ENVConstant.GATEWAY_URL+APPConstant.BENEFICIARY_APP+URLConstant.MANAGER_BENEFICIARY_API_URL).then(res=>res);
            console.log("beneficiaryPendingResponse ",beneficiaryPendingResponse);
            setBeneficiaries(beneficiaryPendingResponse.data);
            
         } catch (error) {
             setBeneficiaries([]);
             setMsg(true)
             console.log(error.response)
         }

    }

    useEffect(()=>{    
            getBeneficiaries(JSON.parse(sessionStorage.getItem('userdetails')));       
        
    },[])


    function handleRemarkOnClick(event){
        event.preventDefault();
        setIsRemarkEdit(true);
    }
    function handleRemarkOnChange(event){
        event.preventDefault();
        setRemark(event.target.value);
    }

    function HandleBackBtn(){
        navigate("/managerDashboard");
    }

    async function handleAprove(beneficiary){
        const name="remark";
        const name1="status";
        beneficiary={...beneficiary,[name]:remark,[name1]:"Active"};
        const response= await axiosInstance.put(ENVConstant.GATEWAY_URL+APPConstant.BENEFICIARY_APP+URLConstant.MANAGER_BENEFICIARY_API_URL,beneficiary).then(res=>res);
        if(response.status===HttpStatusCode.Accepted){
            getBeneficiaries();
            
        }
    }
    async function handleReject(beneficiary){
        const name="remark";
        const name1="status";
        beneficiary={...beneficiary,[name]:remark,[name1]:"Reject"};
        const response= await axiosInstance.put(ENVConstant.GATEWAY_URL+APPConstant.BENEFICIARY_APP+URLConstant.MANAGER_BENEFICIARY_API_URL,beneficiary).then(res=>res);
        if(response.status===HttpStatusCode.Accepted){
            getBeneficiaries();
        }
    }
    return (
        <>
        <Header/>

        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h3>Pending Beneficiary Details</h3>
                    { msg && <p className="text-warning">No Pending Beneficiaries</p> }
                </div>
                <div className="card-body">
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Beneficiary Name</th>
                        <th scope="col">IFSC Code </th>
                        <th scope="col">Beneficiary AccountId</th>
                        <th scope="col">Beneficiary Email</th>
                        <th scope="col">Remark</th>
                        <th scope="col">Aprove</th>
                        <th scope="col">Reject</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                        {beneficiaries.map((beneficiary,index)=>{

                            return(
                                <tr key={index}>
                                    <th scope="row">{index+1}</th>
                                    <td>{beneficiary.name}</td>
                                    <td>{beneficiary.accountIFSC}</td>
                                    <td>{beneficiary.accountNumber}</td>
                                    <td>{beneficiary.email}</td>
                                    <td>
                                        {   isRemarkEdit ===true  ? 
                                             <input type="text" name="remark" value={remark} placeholder="Remark"  onChange={(event)=>handleRemarkOnChange(event)} />
                                            : <a href="#" onClick={(event)=>handleRemarkOnClick(event)} 
                                                         
                                            >remark</a> }
                                    </td>
                                    <td><button className="btn" onClick={()=>handleAprove(beneficiary)}><i class="fa fa-pencil-square" aria-hidden="true"></i></button></td>
                                    <td><button className="btn" onClick={()=>handleReject(beneficiary)}><i class="fa fa-trash" aria-hidden="true"></i></button></td>
                                </tr>
                            )

                         })}
                        
                        
                    </tbody>
                </table>
                    
                </div>
            </div>
            <div class="row my-4">
                <div class="col">
                <div >
                
                    <button class="btn btn-success" onClick={(event)=>HandleBackBtn(event)}>
                    BACK
                    </button>
                </div>
                </div>
            </div>
        </div>

        </>
    )
}

export default Beneficiary;