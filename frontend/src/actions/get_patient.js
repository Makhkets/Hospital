import axios from "axios"
import getCookie from "./getCookie"

export const getPatient = async (id) => {
    try {
        const access = getCookie("access")
        let response = await axios.get(`http://127.0.0.1:8000/auth/patients/${id}/`, {
            // headers: {
            //     "Authorization": `JWT ${access}`
            // }
        })
        console.log(response.data)
        return response
    } catch {
        return false;
    }
}

