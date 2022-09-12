import React from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Sidebar from "./subcomponents/Sidebar";
import Footer from "./subcomponents/Footer";
import Cap from "./subcomponents/Cap";


const Layout = () => {
    const location = useLocation()
    const choice = () => {
        if (location.pathname === "/")
            return "1";
        else if (location.pathname.includes("profile"))
            return "2";
        else if (location.pathname.includes("information"))
            return "3";
        else if (location.pathname.includes("add"))
            return "4";
        return "1";
    }

    return (
        <>
            <div className="container">
                <Sidebar choice={choice()} />
                <main>
                    <Cap />
                    <Outlet />
                </main>        
            </div>
            <Footer />
        </>
    );
};

export default Layout;