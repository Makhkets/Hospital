import axios from "axios"
import { useState } from "react"
import getCookie from "./getCookie"
import setCookie from "./setCookie"

export const getUser = async () => {
    const access = getCookie("access")
    const refresh = getCookie("refresh")
    const url = "http://127.0.0.1:8000"
    

    if (access) {

        let response = await axios.get(`${url}/auth/users/me`, {
            headers: {
                "Authorization": `JWT ${access}`
            }
        })

        if (response.data.id > 0) {
            return response
        } else {
            return false
        }

    } 
    
    else if (refresh) {
        let response = await axios.post(`${url}/auth/jwt/refresh/`, {
            "refresh": refresh
        })

        setCookie("access", response.data.access, {'max-age': 300})

        let resp = await axios.get(`${url}/auth/users/me`, {
            headers: {
                "Authorization": `JWT ${response.data.access}`
            }
        })

        if (response.data.id > 0) {
            return response
        } else {
            return false
        }
    } 
    

    else {
        return false
    }
}

