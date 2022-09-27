import axios from "axios"
import getCookie from "./getCookie"

export const getActiveBranchPatients = async (branch) => {
    try {
        const access = getCookie("access")
        let response = await axios.get(`http://127.0.0.1:8000/auth/patients/${branch}/branch`)
        if (response.data) {
            return response.data;
        } else {
            return false;
        }
    } catch {
        return false;
    }
}