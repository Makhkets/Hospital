import axios from "axios";
import getCookie from "./getCookie";

async function addPatient(first_name, last_name, patronymic,
                            passport_series, medical_number, doctor, branch) {
    try {
        const access = getCookie("access")
        let response = await axios.post(`http://127.0.0.1:8000/auth/patients/`, {
            first_name: first_name,
            last_name: last_name,
            patronymic: patronymic,
            series: passport_series,
            medical_number: medical_number,
            branch: branch,
            doctor: doctor,
        }, {
            headers: {
                "Authorization": `JWT ${access}`
            }
        })
    
        console.log(response)
        return true
    } catch(e) {
        console.error(e)
        return false
    }
}
  
export default addPatient;