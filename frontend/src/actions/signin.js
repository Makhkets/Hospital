
import axios from "axios"
import setCookie from "./setCookie"

const url = "http://encodee.pythonanywhere.com"

export const signin = async (username, password) => {    
    const config = {
        headers: {
            'Content-Type': 'application/json'            
        }
    }

    let body = JSON.stringify({username, password})

    try {
        let response = await axios.post(`${url}/auth/jwt/create/`, body, config)

        const access = response.data.access
        const refresh = response.data.refresh
        
        if (access) {
            setCookie("access", access, {'max-age': 300})
            setCookie("refresh", refresh, {'max-age': 3024000})
            
            return true
        }
        
    } catch(e) {
        return false;
    }
}