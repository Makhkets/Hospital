import axios from "axios"

export const findPersonal = async () => {
    try {
        let response = await axios.get(`http://encodee.pythonanywhere.com/auth/personal/`)
        if (response.data) {
            return response.data;
        } else {
            return false;
        }
    } catch {
        return false;
    }
}