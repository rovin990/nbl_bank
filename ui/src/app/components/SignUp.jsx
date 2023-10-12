import React, { useState } from "react";
import UserService from "../services/UserService";
import {HTTPCode} from "../constant/HttpCode";

import {useNavigate} from "react-router-dom"
import Header from "./Header";

const userservice = new UserService();

function SignUp(){
    const navigate = useNavigate();
    const [user,setuser] = useState({
        fName:"",
        lName:"",
        email:"",
        mobile:"",
        username:"",
        password:"",
        cpassword:"",
        authStatus:""
    });

    // const [isDone ,setIsDone] = useState({})

    function handleOnchange(event){

        const name = event.target.name;
        const value= event.target.value;        
        setuser(prev=>{
            return {...prev,[name]:value}
        })
    }

    async function saveMessage(event){
        event.preventDefault();
        let isDone = await userservice.signUp(user).then(res=>res);
        // setuser({
        //     fName:"",
        //     lName:"",
        //     email:"",
        //     mobile:"",
        //     username:"",
        //     password:"",
        //     cpassword:""
        // })

        console.log("is done ",isDone)
        if(isDone.status===HTTPCode.Accepted){
            const name="authStatus";
            const value="AUTH";
            window.sessionStorage.setItem("userdetails",JSON.stringify({...isDone.data,[name]:value}));
            navigate("/dashboard");
        }
    }

    return(
        <>
            <Header/>
        
        <section >
            <div className="container mt-5 ">
                <div className="row ">
                    <div className="col-md-6 offset-md-3 ">
                          {/* {model.contactId &&  <span className="text-success">Your message is submitted. Reference ID is {model.contactId}</span> } */}
                          <h4 className="text-center mb-4">SignUp</h4>
                          <form className="mx-1 mx-md-4" onSubmit={saveMessage}>
                            <div class="form-group">
                                <input type="text" 
                                class="form-control"
                                 id="fName" 
                                 name="fName"
                                 placeholder="First Name" 
                                 value={user.fName}
                                onChange={(event)=>{
                                    handleOnchange(event)
                                }}
                                 />
                            </div>
                            <div class="form-group">
                                <input type="text" 
                                class="form-control"
                                 id="lName" 
                                 name="lName"
                                 placeholder="Last Name" 
                                 value={user.lName}
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
                                value={user.email}
                                onChange={(event)=>{
                                    handleOnchange(event)
                                }}
                                />
                            </div>
                            <div class="form-group">
                                <input type="text" 
                                class="form-control" 
                                minLength={10}
                                id="mobile" 
                                name="mobile"
                                placeholder="Mobile Number" 
                                value={user.mobile}
                                onChange={(event)=>{
                                    handleOnchange(event)
                                }}
                                />
                            </div>
                            <div class="form-group">
                                <input type="text" 
                                class="form-control" 
                                id="username" 
                                name="username"
                                placeholder="User Name" 
                                value={user.username}
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
                            <div class="form-group">
                                <input type="password" 
                                class="form-control" 
                                id="cpassword" 
                                name="cpassword"
                                placeholder="Confirm Password" 
                                value={user.cpassword}
                                onChange={(event)=>{
                                    handleOnchange(event)
                                }}
                                />
                            </div>
                            
                            <button type="submit" class="btn btn-success">SignUp</button>
                          </form>

                    </div>
                </div>
          </div>
     </section>
     </>
    )
}

export default SignUp;