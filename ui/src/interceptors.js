import axios from "axios";
import { ENVConstant } from "./app/enviroments/Constant";

const axiosInstance= axios.create({
    baseURL:ENVConstant.GATEWAY_UR
});


axiosInstance.interceptors.request.use(
    (config)=>{
        let user;
        if(sessionStorage.getItem('userdetails')){
            user = JSON.parse(sessionStorage.getItem('userdetails') || null);
        }
        
        let authorization = sessionStorage.getItem("Authorization");
        if(authorization){
                config.headers['Authorization']='Bearer '+authorization;
        }
        return config;
    },
    error => {
        Promise.reject(error)
      }
)

export default axiosInstance;