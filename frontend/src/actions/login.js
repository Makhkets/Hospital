
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
        
        setCookie("access", access, {'max-age': 300})
        setCookie("refresh", refresh, {'max-age': 3024000})


        let resp = await axios.post(`${url}/auth/users/resend_activation/`, {email: email}, {
            headers: {
                "authorization": `JWT ${access}`
            }
        });

        console.log(resp)
        console.log(resp)
        console.log(resp)
        console.log(resp)
        console.log(resp)
        console.log(resp)
        console.log(resp)
        


        return true
        
    } catch(e) {
        console.log(e)

    }
}