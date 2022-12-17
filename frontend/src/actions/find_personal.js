import axios from "axios"

export const findPersonal = async () => {
    try {
        let response = await axios.get(`http://127.0.0.1:8000/auth/personal/`)
        if (response.data) {
            return response.data;
        } else {
            return false;
        }
    } catch {
        return false;
    }
}