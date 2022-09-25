import axios from "axios";
import getCookie from "./getCookie";

async function extractPatient(patient) {
    const access = getCookie("access")
    try {
        let response = await axios.patch(`http://127.0.0.1:8000/auth/patients/${patient}/`, {
            chamber: null,
            branch: "Не выбрано"
        }, {
            headers: {
                "Authorization": `JWT ${access}`
            }
        })
        return true;
    } catch {
        return false;
    }
}
  
export default extractPatient;