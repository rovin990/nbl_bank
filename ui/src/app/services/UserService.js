import axios from "axios";
import {APPConstant} from "../constant/APPConstant";
import {URLConstant} from "../constant/URLConstant";
import {ENVConstant} from "../enviroments/Constant";
import User from "../model/User";
class UserService{

   async signUp(user) {
        let signupData = new User("",user.fName+user.lName,user.mobile,user.email,user.password,"Updated","","","")
        // console.log("signupData ",signupData)
        return await axios.post(ENVConstant.GATEWAY_URL+APPConstant.AUTH_APP+URLConstant.SignUP_API_URL, signupData);
    }

    async login(user) {
        let loginData = new User("","","",user.email,user.password,"","","","")
        console.log("loginData ",loginData)
       
        return await axios.post(ENVConstant.GATEWAY_URL+APPConstant.AUTH_APP+URLConstant.LOGIN_API_URL,{},{withCredentials:true,auth:{username:user.email,password:user.password}});
        // return await axios.post("http://localhost:8080/loans/save", {loanAcc:"KCC-123",loanType:"KCC"});
    }

}

export default UserService;