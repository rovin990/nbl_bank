import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../../interceptors";

import Header from "./Header";
import {APPConstant} from "../constant/APPConstant";
import {URLConstant} from "../constant/URLConstant";
import {ENVConstant} from "../enviroments/Constant";
import {Constant} from "../constant/Constant";

function Account(){
    const navigate = useNavigate();
    const [user,setUser] = useState({});
    const [current,setCurrent] = useState({});
    const [saving,setSaving] = useState({});

    useEffect(()=>{        
        const loggedInUser=JSON.parse(sessionStorage.getItem('userdetails') || "");
        console.log("userdetails in Account ",loggedInUser)
        if(loggedInUser!==null){
            setUser(loggedInUser || "");
            getAccounts(loggedInUser.id);
        }
        
       
    },[])

    async function getAccounts(userId){
        console.log("userId in getAccounts",userId)
        console.log("user in getAccounts",user)
        const accountsResponse=await axiosInstance.get(ENVConstant.GATEWAY_URL+APPConstant.ACCOUNT_APP+URLConstant.ACCOUNT_API_ALL_URL+Constant.FORWARD_SLASH+userId).then(res=>res.data)
        console.log("accountsResponse",accountsResponse);

        if(accountsResponse!==null){
            setCurrent(accountsResponse[0]);
            setSaving(accountsResponse[1]);
        }
        
    }

    function HandleBackBtn(){
        navigate("/dashboard");
    }

    return (
        <>
        <Header/>
    
        
        <div className="container mt-4">
            <div className="card">
                <div class="card-header" id="headingOne">
                    <h2>Accounts </h2>
                </div>
                <div className="card-body">
                    <div id="accordion">
                        <div class="card">
                            <div class="card-header" id="headingOne">
                            <h5 class="mb-0">
                                <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Current
                                </button>
                            </h5>
                            </div>

                            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                            <div class="card-body">
                                <div className="account d-flex flex-column">
                                    <div className="d-flex justify-content-around ">
                                        <h6>Account Id</h6>
                                        <h6>Balance</h6>
                                        <h6>View Transactions</h6>                                        
                                    </div>
                                    <div className="d-flex justify-content-around  p-3">
                                     <p> {current && current.accountNumber }</p>
                                     <p> {current && current.closingBalance }</p>
                                     <a href="/view-transactionns" >
                                        <i className="fa fa-eye-slash" aria-hidden="false"></i>
                                     </a>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="headingTwo">
                            <h5 class="mb-0">
                                <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Saving
                                </button>
                            </h5>
                            </div>
                            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                            <div class="card-body">
                                <div className="account d-flex flex-column">
                                    <div className="d-flex justify-content-around">
                                        <h6>Account Id</h6>
                                        <h6>Balance</h6>
                                        <h6>View Transactions</h6> 
                                        
                                    </div>
                                    <div className="d-flex justify-content-around">
                                        <p> {saving && saving.accountNumber }</p>
                                        <p> {saving && saving.closingBalance }</p>
                                        <a href="/view-transactionns" >
                                            <i className="fa fa-eye-slash" aria-hidden="false"></i>         

                                        </a>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
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

export default Account;

