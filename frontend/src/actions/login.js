
import axios from "axios"
import setCookie from "./cookie"


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
        
        setCookie("access", access, {'max-age': 1800})
        setCookie("refresh", refresh, {'max-age': 3024000})
        
        // записали в куки аццесс токен, надо сделать авто обновление токена

        console.log(response.data)
    } catch(e) {
        console.error("Ошибка авторизации")
        console.error(e)
    }
}