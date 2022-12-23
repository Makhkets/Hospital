import axios from "axios"

export const findServices = async () => {
    try {
        let response = await axios.get(`http://encodee.pythonanywhere.com/auth/service/`)
        if (response.data) {
            return response.data;
        } else {
            return false;
        }
    } catch {
        return false;
    }
}