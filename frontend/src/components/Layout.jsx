import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Sidebar from "./subcomponents/Sidebar";
import Footer from "./subcomponents/Footer";
import Cap from "./subcomponents/Cap";
import { getUser, User } from "../actions/user";
import { useState } from "react";
import { useEffect } from "react";


const Layout = () => {

    
    const [flag, setFlag] = useState(null)
    const [user, setUser] = useState({})

    useEffect(() => {
        const result = async () => {
            const data = await getUser()
            console.log(data.data)

    
            if (data.data) {
                setFlag(true)
                setUser(data.data)
            } else {
                setFlag(false)
            }
        }
        result()
      }, []);


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

    if (flag === null) {
        // значит не весь компонент загрузился
    } else {
        return (
            <>
                <div className="container">
                    <Sidebar choice={choice()} user={user} flag={flag} />
                    <main>
                        <Cap user={user} flag={flag} />
                        <Outlet />
                    </main>        
                </div>
                <Footer user={user} flag={flag} />
            </>
        );
    }
};

export default Layout;