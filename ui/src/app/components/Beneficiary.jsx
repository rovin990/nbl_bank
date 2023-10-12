import React, { useEffect ,useState} from "react";
import axiosInstance from "../../interceptors";
import {useNavigate} from "react-router-dom"

import {ENVConstant} from "../enviroments/Constant";
import {APPConstant} from "../constant/APPConstant";
import {Constant} from "../constant/Constant";
import { URLConstant } from "../constant/URLConstant";
import Header from "./Header";


function Beneficiary(){
    const navigate = useNavigate();
    const [beneficiaries,setBeneficiaries] = useState([]);
    const [isDisplay,setIsDisplay] = useState(false);
    const [isEdit,setIsEdit] = useState(false);
    const [beneficiary,setBeneficiary] =useState({});
    const [msg,setMsg] =useState("");

    async function  getBeneficiaries(data){       
       const name="customerId";
        setBeneficiary(pre=>{
            return {...pre,[name]:data.id}
        })
        try {
           const beneficiaryResponse= await axiosInstance.get(ENVConstant.GATEWAY_URL+APPConstant.BENEFICIARY_APP+URLConstant.BENEFICIARY_API_URL+Constant.FORWARD_SLASH+data.id).then(res=>res);
           console.log(beneficiaryResponse.data)
           setBeneficiaries(beneficiaryResponse.data)
        } catch (error) {
            setBeneficiaries([]);
            console.log(error.response)
        }
    }

    useEffect(()=>{    

        if(sessionStorage.getItem('userdetails')){
            getBeneficiaries(JSON.parse(sessionStorage.getItem('userdetails')));            
        }
        
    },[])

    function HandleBackBtn(){
        navigate("/dashboard");
    }
    function displayForm(){
        setIsDisplay(true);
        setIsEdit(false);
    }

    function handleOnchange(event){
        const name= event.target.name;
        const value= event.target.value;
        setBeneficiary(pre=>{
            return {...pre,[name]:value}
        })
    }

    async function saveBeneficiary(event){
        event.preventDefault();
        console.log(ENVConstant.GATEWAY_URL+APPConstant.BENEFICIARY_APP+URLConstant.BENEFICIARY_API_URL,beneficiary)
        try {
            const beneficiaryResponse= await axiosInstance.post(ENVConstant.GATEWAY_URL+APPConstant.BENEFICIARY_APP+URLConstant.BENEFICIARY_API_URL,beneficiary).then(res=>res);
            setMsg(beneficiaryResponse.data);

            if(sessionStorage.getItem('userdetails')){
                getBeneficiaries(JSON.parse(sessionStorage.getItem('userdetails')));            
            }

        } catch (error) {
            
        }
    }

    async function handleEdit(editBeneficiary){
        setBeneficiary(editBeneficiary);
        setIsDisplay(false);
        setIsEdit(true);
        console.log("updated ",beneficiary)
    }

    async function handleDelete(deletedId){
        //console.log(ENVConstant.GATEWAY_URL+APPConstant.BENEFICIARY_APP+URLConstant.BENEFICIARY_API_URL,deletedId)
        try {
           const deletedResponse= await axiosInstance.delete(ENVConstant.GATEWAY_URL+APPConstant.BENEFICIARY_APP+URLConstant.BENEFICIARY_API_URL+Constant.FORWARD_SLASH+deletedId).then(res=>res);
           console.log("deletedResponse.data",deletedResponse); 
           setMsg(deletedResponse.data);

            if(sessionStorage.getItem('userdetails')){
                getBeneficiaries(JSON.parse(sessionStorage.getItem('userdetails')));            
            }

        } catch (error) {
            
        }
    }

    async function UpdateBeneficiary(event){
        event.preventDefault();
        console.log(ENVConstant.GATEWAY_URL+APPConstant.BENEFICIARY_APP+URLConstant.BENEFICIARY_API_URL,beneficiary)
        try {
            const beneficiaryResponse= await axiosInstance.put(ENVConstant.GATEWAY_URL+APPConstant.BENEFICIARY_APP+URLConstant.BENEFICIARY_API_URL,beneficiary).then(res=>res);
            setMsg(beneficiaryResponse.data);
            if(sessionStorage.getItem('userdetails')){
                getBeneficiaries(JSON.parse(sessionStorage.getItem('userdetails')));            
            }

        } catch (error) {
            
        }
    }
    return (
        <>
            <Header/>
        
        <div className="container">
            <div className="row mt-5">
                <div className="d-flex ">
                    <div className="card mx-3">
                        <div className="card-header">
                            <h3>Beneficiaries Details</h3>
                            <button class="btn btn-success" onClick={()=>displayForm()}>
                                ➕
                            </button>
                        </div>
                        <div className="card-body">
                        {msg==="Deleted"?<span className="text-success">Your beneficiary is {msg}</span>:null}
                        <table class="table">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Beneficiary Name</th>
                        <th scope="col">IFSC</th>
                        <th scope="col">AccountId</th>
                        <th scope="col">Email</th>
                        <th scope="col">Manager Remark</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
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
                                    <td>{beneficiary.remark}</td>
                                    <td><button className="btn" onClick={()=>handleEdit(beneficiary)}><i class="fa fa-pencil-square" aria-hidden="true"></i></button></td>
                                    <td><button className="btn" onClick={()=>handleDelete(beneficiary.id)}><i class="fa fa-trash" aria-hidden="true"></i></button></td>
                                </tr>
                            )

                         })}
                        
                        
                    </tbody>
                </table>
            </div>
            </div>
                    {isDisplay && <div className="card">
                        <div className="card-header">
                        {msg.startsWith("BR-S-") && <span className="text-success">Your beneficiary is submitted. Reference ID is :<br></br>{msg}</span>
                         }
                        <h3>Add Beneficiary Details</h3>
                        
                        </div>
                        <div className="card-body">
                            <form className="mx-1 mx-md-4" onSubmit={(event)=>saveBeneficiary(event)}>
                            <div class="form-group">
                                <input type="text" 
                                class="form-control"
                                 id="bname" 
                                 name="name"
                                 placeholder="Beneficiary Name" 
                                 value={beneficiary.name}
                                onChange={(event)=>{
                                    handleOnchange(event)
                                }}
                                 />
                            </div>
                            <div class="form-group">
                                <input type="text" 
                                class="form-control"
                                 id="accountIFSC" 
                                 name="accountIFSC"
                                 placeholder="IFSC" 
                                 value={beneficiary.accountIFSC}
                                onChange={(event)=>{
                                    handleOnchange(event)
                                }}
                                 />
                            </div>
                            <div class="form-group">
                                <input type="email" 
                                class="form-control" 
                                id="email" 
                                name="email"
                                placeholder="Email" 
                                value={beneficiary.email}
                                onChange={(event)=>{
                                    handleOnchange(event)
                                }}
                                />
                            </div>
                            <div class="form-group">
                                <input type="text" 
                                class="form-control" 
                                minLength={10}
                                id="accountNumber" 
                                name="accountNumber"
                                placeholder="Account Number" 
                                value={beneficiary.accountNumber}
                                onChange={(event)=>{
                                    handleOnchange(event)
                                }}
                                />
                            </div>
                            
                            <button type="submit" class="btn btn-success">Add</button>
                          </form>

                        </div>
                    </div>
                    }

                    {isEdit && 
                    
                    <div className="card">
                        <div className="card-header">
                        {msg.startsWith("BR-U-") && <span className="text-success">Your beneficiary is Updated. Reference ID is :<br></br>{msg}</span>
                         }
                        <h3>Update Beneficiary Details</h3>
                        </div>
                        <div className="card-body" >
                        <form className="mx-1 mx-md-4" onSubmit={(event)=>UpdateBeneficiary(event)}>
                            <div class="form-group">
                                <input type="text" 
                                class="form-control"
                                 id="bname" 
                                 name="name"
                                 placeholder="Beneficiary Name" 
                                 value={beneficiary.name}
                                onChange={(event)=>{
                                    handleOnchange(event)
                                }}
                                 />
                            </div>
                            <div class="form-group">
                                <input type="text" 
                                class="form-control"
                                 id="accountIFSC" 
                                 name="accountIFSC"
                                 placeholder="IFSC" 
                                 value={beneficiary.accountIFSC}
                                onChange={(event)=>{
                                    handleOnchange(event)
                                }}
                                 />
                            </div>
                            <div class="form-group">
                                <input type="email" 
                                class="form-control" 
                                id="email" 
                                name="email"
                                placeholder="Email" 
                                value={beneficiary.email}
                                onChange={(event)=>{
                                    handleOnchange(event)
                                }}
                                />
                            </div>
                            <div class="form-group">
                                <input type="text" 
                                class="form-control" 
                                minLength={10}
                                id="accountNumber" 
                                name="accountNumber"
                                placeholder="Account Number" 
                                value={beneficiary.accountNumber}
                                onChange={(event)=>{
                                    handleOnchange(event)
                                }}
                                />
                            </div>
                            
                            <button type="submit" class="btn btn-success">Update</button>
                          </form>
                        </div>
                    </div>
                    
                    }
                </div>
                
            </div>
            <div class="row my-4">
                <div class="col">
                <div class="">
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