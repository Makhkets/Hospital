import axios from "axios"

export const findServices = async () => {
    try {
        let response = await axios.get(`http://127.0.0.1:8000/auth/service/`)
        if (response.data) {
            return response.data;
        } else {
            return false;
        }
    } catch {
        return false;
    }
}