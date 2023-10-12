import React ,{useState} from "react";
import UserService from "../services/UserService";
import {HTTPCode} from "../constant/HttpCode";

import {useNavigate} from "react-router-dom"
import Header from "./Header";

const userservice = new UserService();

function Login(){
    const navigate = useNavigate();
    const [user,setuser] = useState({
        fName:"",
        lName:"",
        email:"",
        mobile:"",
        username:"",
        password:"",
        cpassword:""
    });

    function handleOnchange(event){

        const name = event.target.name;
        const value= event.target.value;        
        setuser(prev=>{
            return {...prev,[name]:value}
        })
    }

    async function validateUser(event){
        event.preventDefault();
        
        const loginResponse = await userservice.login(user).then(res=>res);
        console.log("loginResponse ",loginResponse);
        if(loginResponse.status===HTTPCode.Created){
            const name="authStatus";
            const value="AUTH";
            let loggedInUser=loginResponse.data;
            loggedInUser ={...loggedInUser, [name]:value};
            console.log("after login ",loggedInUser)
            let userdetails = JSON.stringify(loggedInUser)
            
            window.sessionStorage.setItem("userdetails",userdetails);
            window.sessionStorage.setItem("Authorization",loginResponse.headers.get("Authorization"));
            if(loggedInUser.role==="manager"){
                navigate("/managerDashboard");
            }else{
                navigate("/dashboard");
            }
            
        }
    }

    return (
        <>
            <Header/>
       
        <section >
            <div className="container mt-5 ">
                <div className="row ">
                    
                    <div className="col-md-6 offset-md-3 ">
                          {/* {model.contactId &&  <span className="text-success">Your message is submitted. Reference ID is {model.contactId}</span> } */}
                          <h4 className="text-center mb-4">Login</h4>
                          <form className="mx-1 mx-md-4" onSubmit={validateUser}>
                            <div class="form-group">
                                <input type="email" 
                                class="form-control" 
                                id="email" 
                                name="email"
                                placeholder="Email" 
                                value={user.email}
                                onChange={(event)=>{
                                    handleOnchange(event)
                                }}
                                />
                            </div>
                            <div class="form-group">
                                <input type="password" 
                                class="form-control" 
                                id="password" 
                                name="password"
                                placeholder="Password" 
                                value={user.password}
                                onChange={(event)=>{
                                    handleOnchange(event)
                                }}
                                />
                            </div>                            
                            <button type="submit" class="btn btn-success">Login</button>
                            
                          </form>

                    </div>
                </div>
          </div>
     </section>
     </>
    )
}

export default Login;