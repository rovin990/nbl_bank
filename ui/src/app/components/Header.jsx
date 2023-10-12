import React, { useEffect, useState ,} from "react";
// import User from "../model/User";



function Header(){

    const [user,setUser]=useState({});
    useEffect(()=>{
        if(sessionStorage.getItem('userdetails')){
            setUser(JSON.parse(sessionStorage.getItem('userdetails')) || "");
          }
        console.log("header components")
    },[])


    return(
        <div className="wrapper top-section">
            <div className="hleft">
                <a className="logo selfLogo" >
                    <img alt="logo" src={process.env.PUBLIC_URL+ "/assets/images/logo.png" }  />
                    
                </a>
            </div>
            <div className="mnav_hb hide">
                <div className="hamburger">
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                </div>
            
            </div>
            <nav className="hright dnav">
                <ul>
                  {user.authStatus!=='AUTH' && <li className="list-item"><a className="active"href="/home">Home</a></li>}
                  {user.authStatus!=='AUTH' && <li className="list-item"><a href="/login">Login</a></li> }
                  {user.authStatus!=='AUTH' && <li className="list-item"><a href="/sign-up">SignUp</a></li> }
                  {user.authStatus==='AUTH' && <li className="list-item"><a href="/dashboard">Dashboard</a></li>}
                  {user.authStatus==='AUTH' && <li className="list-item"><a href="/logout">Logout</a></li>}
                </ul>
            </nav>
         </div>
        ) 
}

export default Header;