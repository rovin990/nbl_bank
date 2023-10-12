import React, { useEffect ,useState} from "react";
import {useNavigate} from "react-router-dom"
import Header from "./Header";

function Dashboard(){
    const navigate = useNavigate();
    const [user ,setUser]= useState({});
    useEffect(()=>{
        const loggedInUser=JSON.parse(sessionStorage.getItem('userdetails') || "");
        console.log("userdetails in Dashboard ",loggedInUser)
        if(loggedInUser!==null){
            setUser(loggedInUser || "");
        }
       
    },[])

    const bgColor={
        fontSize:'3em',
        color : '#343a40'
    }


    function handleOnClick(event){
        const element=event.target;

        const clickedDiv = element.getInnerHTML();

        if(clickedDiv==="Account"){
            navigate("/account")
        }
        else if(clickedDiv==="Balance"){
            navigate("/balance")
        }
        else if(clickedDiv==="Loans"){
            navigate("/loans")
        }
        else {
            navigate("/beneficiaries")
        }
    }

    return (
        <>
            <Header/>
       
    <div className="container-fluid content-top-gap">

    <div className="welcome-msg pt-3 pb-4">
        <h1>Hi <span className="text-dark">{user.name}</span>, Welcome back</h1>
        <p>You logged in as {user.role}</p>
    </div>

    {/* <!-- User data --> */}
    <div className="statistics">
        <div className="row">
        <div className="col-xl-6 pr-xl-2">
            <div className="row">
            <div className="col-sm-6 pr-sm-2 statistics-grid" onClick={(event)=>handleOnClick(event)}>
                <div className="card card_border border-primary-top p-4">
                <i style={bgColor} className="fa fa-user-circle-o"> </i>
                <h3 className="text-dark number">Account</h3>
                <p className="stat-text">View account details</p>
                </div>
            </div>
            <div className="col-sm-6 pl-sm-2 statistics-grid" onClick={(event)=>handleOnClick(event)}>
                <div className="card card_border border-primary-top p-4">
                <i style={bgColor} className="fa fa-usd"> </i>
                <h3 className="text-dark number">Balance</h3>
                <p className="stat-text">View total available balance</p>
                </div>
            </div>
            </div>
        </div>
        <div className="col-xl-6 pl-xl-2">
            <div className="row">
            <div className="col-sm-6 pr-sm-2 statistics-grid" onClick={(event)=>handleOnClick(event)}>
                <div className="card card_border border-primary-top p-4">
                <i style={bgColor} className="fa fa-money"> </i>
                <h3 className="text-dark number">Loans</h3>
                <p className="stat-text">View Loan Details</p>
                </div>
            </div>
            <div className="col-sm-6 pl-sm-2 statistics-grid" onClick={(event)=>handleOnClick(event)}>
                <div className="card card_border border-primary-top p-4" >
                <i style={bgColor} className="fa fa-credit-card"> </i>
                <h3 className="text-dark number">Beneficiary</h3>
                <p className="stat-text">View beneficiaries details</p>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    
    </div>
    </>
    )
}

export default Dashboard;