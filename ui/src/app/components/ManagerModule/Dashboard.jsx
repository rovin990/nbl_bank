import React, { useEffect ,useState} from "react";
import {useNavigate} from "react-router-dom"
import Header from "../Header";

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
        else {
            navigate("/managerBeneficiaries")
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
                                <h3 className="text-dark number">Profile</h3>
                                <p className="stat-text">View profile details</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 pr-xl-2">
                    <div className="row">
                        <div className="col-sm-6 pr-sm-2 statistics-grid" onClick={(event)=>handleOnClick(event)}>
                            <div className="card card_border border-primary-top p-4">
                                <i style={bgColor} className="fa fa-user-circle-o"> </i>
                                <h3 className="text-dark number">Beneficiary</h3>
                                <p className="stat-text">View pending beneficiaries details</p>
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