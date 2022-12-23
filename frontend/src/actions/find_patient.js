import axios from "axios"

export const findtPatient = async (patient) => {
    try {
        let response = await axios.get(`http://encodee.pythonanywhere.com/auth/patients/${patient}/find`)
        if (response.data) {
            return response.data;
        } else {
            return false;
        }
    } catch {
        return false;
    }
}