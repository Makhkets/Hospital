
import axios from "axios"
import getCookie from "./getCookie"

export const getHistoryPatient = async (id) => {
    try {
        const access = getCookie("access")
        let response = await axios.get(`http://127.0.0.1:8000/auth/actionHistory/${id}/`, {
            headers: {
                "Authorization": `JWT ${access}`
            }
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
