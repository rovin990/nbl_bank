import React from "react";
import {Outlet} from "react-router-dom";
// import Header from "./Header";

function Layout(){

    return <>
        <Outlet />
    </>
}

export default Layout;