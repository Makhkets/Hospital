import axios from "axios"
import getCookie from "./getCookie"
import setCookie from "./setCookie"

export const User = async () => {
    try {
        const access = getCookie("access")
        const refresh = getCookie("refresh")

        if (access) {
            let url = "http://127.0.0.1:8000/auth/users/me/"
            let config = {
                headers: {       
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${access}`
                }
            }

            const req = async () => {
                const {data} = await axios.get(url, config)
                return data
            }

            const response = await req()
            
            if (response) {
                if (response.id > 0) {
                   return response
                };
            };
            
            return false;
        }
        console.log("Не авторизован")
        return false;
    } catch(e) {
        console.log("Ошибка " + e)
        return false;
    }
}