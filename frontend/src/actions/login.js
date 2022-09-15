
import axios from "axios"
import setCookie from "./setCookie"

const url = "http://127.0.0.1:8000"

export const signup = async (email, username, password) => {    
    const config = {
        headers: {
            'Content-Type': 'application/json'            
        }
    }

    let body = JSON.stringify({username, email, password})

    try {
        let response = await axios.post(`${url}/auth/users/`, body, config)
        const id = response.data.id
        const email = response.data.email
        const password = response.data.password

        response = await axios.post(`${url}/auth/jwt/create/`, body, config)
        const access = response.data.access
        const refresh = response.data.refresh
        
        console.log(response.data)

        setCookie("access", access, {'max-age': 200000})
        setCookie("refresh", refresh, {'max-age': 3024000})
        return true
        
    } catch(e) {
        console.log(e.response.data)

    }
}