import axiosInstance from "../../interceptors";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {APPConstant} from "../constant/APPConstant";
import {URLConstant} from "../constant/URLConstant";
import {ENVConstant} from "../enviroments/Constant";
import {Constant} from "../constant/Constant";
import User from "../model/User";
import Header from "./Header";


function AccountTransactions(){
    
    const navigate = useNavigate();
    const [transactions,setTransactions] = useState([]);
    const [userId ,setUserId]= useState(new User());

    const[searchType,setSearchType] = useState("");
    const[specificDt,setSpecificDt] = useState("");
    const[firstDt,setFirstDt] = useState("");
    const[secondDt,setSecondDt] = useState("");

    const [msg,setMsg] = useState(true);

    async function  getTransactions(user){
        setUserId(user.id)
        console.log(ENVConstant.GATEWAY_URL+APPConstant.ACCOUNT_APP+URLConstant.TRANSACTION_API_URL+Constant.FORWARD_SLASH+user.id);
        try {
           const transactionResponse= await axiosInstance.get(ENVConstant.GATEWAY_URL+APPConstant.ACCOUNT_APP+URLConstant.TRANSACTION_API_URL+Constant.FORWARD_SLASH+user.id).then(res=>res);
           console.log(transactionResponse.data)
           setTransactions(transactionResponse.data)
        } catch (error) {
            let errResponse = error.response.data.split(":");
            if(errResponse[2]==='false'){
                setMsg(false);
            }
            
            console.log(errResponse)
        }
    }


    useEffect(()=>{        
        if(sessionStorage.getItem('userdetails')){
            getTransactions(JSON.parse(sessionStorage.getItem('userdetails')));            
        }
    },[])

    function HandleBackBtn(event){
        navigate("/account")
    }
      
    async function handleSearchOption(event){
        setSearchType(event.target.value)
        if(searchType==="All"){
            const transactionResponse= await axiosInstance.get(ENVConstant.GATEWAY_URL+APPConstant.ACCOUNT_APP+URLConstant.TRANSACTION_API_URL+Constant.FORWARD_SLASH+userId).then(res=>res);
           console.log(transactionResponse.data)
           setTransactions(transactionResponse.data)
        }
    }

    async function handleSearchTypeForm(event){
        event.preventDefault();
        if(searchType==="specificDt"){
            let data ={specificDt:specificDt};
            const transactionResponse = await axiosInstance.patch(ENVConstant.GATEWAY_URL+APPConstant.ACCOUNT_APP+URLConstant.TRANSACTION_API_URL+Constant.FORWARD_SLASH+userId,data).then(res=>res);
            console.log(transactionResponse.data)
           setTransactions(transactionResponse.data)
        }else{
            let data ={firstDt:firstDt,secondDt:secondDt};
            console.log("between Dates ",data)
            const transactionResponse = await axiosInstance.patch(ENVConstant.GATEWAY_URL+APPConstant.ACCOUNT_APP+URLConstant.TRANSACTION_API_URL+Constant.FORWARD_SLASH+userId,data).then(res=>res);
            console.log(transactionResponse.data)
           setTransactions(transactionResponse.data)
            console.log("between search")
        }
    }

    function handleBetween(event){
        const name=event.target.name;
        const value= event.target.value;
        if(name==="firstDt"){
            setFirstDt(value)
        }else{
            setSecondDt(value)
        }
    }

    return (
        <>
        <Header/>

        <div className="container">
            <div className="card">
                <div className="card-header">
                    
                    <h3>Transactions Details</h3>
                    <select onClick={(event)=>handleSearchOption(event)}>
                        <option value="All">All</option>
                        <option value="specificDt">specificDt</option>
                        <option value="between">between</option>
                    </select>

                    {searchType ==="specificDt"?
                        <form onSubmit={(event)=>handleSearchTypeForm(event)}>
                            <input type="text" 
                            value={specificDt}  
                            name="specificDt" 
                            placeholder="yyyy-mm-dd" 
                            onChange={(event)=>setSpecificDt(event.target.value)}/> 
                            <button class="btn btn-success">
                            search
                            </button>
                        </form>
                    :null}

                    {searchType ==="between"?
                        <form onSubmit={(event)=>handleSearchTypeForm(event)}>
                            <input type="text" 
                            value={firstDt}  
                            name="firstDt" 
                            placeholder="start Date" 
                            onChange={(event)=>handleBetween(event)}/> 

                            <input type="text" 
                            value={secondDt}  
                            name="secondDt" 
                            placeholder="End Date" 
                            onChange={(event)=>handleBetween(event)}/> 
                            <button class="btn btn-success" >
                            search
                            </button>
                        </form>
                    :null}
                   
                    { !msg && <p className="text-warning">No Transactions history</p> }
                    
                </div>
                <div className="card-body">
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">TransactionType</th>
                        <th scope="col">Creditor name</th>
                        <th scope="col">Creditor AccountId</th>
                        <th scope="col">TansactionDate</th>
                        <th scope="col">TansactionId</th>
                        <th scope="col">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                        {transactions.map((transaction,index)=>{

                            return(
                                <tr key={index}>
                                    <th scope="row">{index+1}</th>
                                    <td>{transaction.transactionType}</td>
                                    <td>{transaction.creditorName}</td>
                                    <td>{transaction.creditorCustomerId}</td>
                                    <td>{transaction.transactionDt}</td>
                                    <td>{transaction.transactionId}</td>
                                    <td>{transaction.transactionAmt}</td>
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

export default AccountTransactions;