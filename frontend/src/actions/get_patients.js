import axios from "axios"
import getCookie from "./getCookie"

export const getPatients = async () => {
    try {
        const access = getCookie("access")
        let response = await axios.get("http://encodee.pythonanywhere.com/auth/patients/", {
            // headers: {
            //     "Authorization": `JWT ${access}`
            // }
        })
        if (response.data) {
            return response.data;
        } else {
            return false;
        }
    } catch {
        return false;
    }
}

