import {createBrowserRouter} from "react-router-dom";

import Layout from "./Layout";
import Home from "./Home";
import Login from "./Login";
import Account from "./Account";
import Balance from "./Balance";
import Dashboard from "./Dashboard";
import Logout from "./Logout";
import SignUp from "./SignUp";
import AccountTransactions from "./AccountTransactions";
import Beneficiary from "./Beneficiary";
import ManagerDashboard from "./ManagerModule/Dashboard";
import ManagerBeneficairy from "./ManagerModule/Beneficairy";


const router= createBrowserRouter([
    {
        element:<Layout />,
        children:[
            {
                path:"/",
                element:<Home/>
            },
            { 
                path: "/home",
                element:<Home />
            },
            { 
                path: "/login",
                element:<Login />
            },
            {
                path:"/sign-up",
                element:<SignUp />
            },
            { 
                path: "/dashboard",
                element:<Dashboard />
            },
            { 
                path: "/logout",
                element:<Logout />
            },
            { 
                path: "/account",
                element:<Account />
            },
            { 
                path: "/balance",
                element:<Balance />
            },
            {
                path:"/view-transactionns",
                element:<AccountTransactions/>
            },
            {
                path:"/beneficiaries",
                element:<Beneficiary/>
            },
            {
                path:"/managerDashboard",
                element:<ManagerDashboard />
            },
            {
                path:"/managerBeneficiaries",
                element:<ManagerBeneficairy/>
            }
        ]
    }
])

export default router;