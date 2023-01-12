
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
        let response = await axios.post(`http://encodee.pythonanywhere.com/auth/users/`, body, config)
        const id = response.data.id
        const email = response.data.email
        const password = response.data.password

        return true
        
    } catch(e) {
        console.log(e)

    }
}