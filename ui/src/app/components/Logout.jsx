import React, { useEffect } from "react";
import Header from "./Header";

function Logout(){

    useEffect(()=>{
        const loggedInUser=JSON.parse(sessionStorage.getItem('userdetails') || "");
        console.log("userdetails in Account ",loggedInUser)
        if(loggedInUser!==null){
            window.sessionStorage.setItem("userdetails",null);
        }
    })

    return <>
        <Header />
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 mt-5">
                    <h6 className="text-success">You have been logout successfully ! <a href ="/login" >click</a> login again</h6>
                </div>
            </div>
        </div>
    </>
}

export default Logout;