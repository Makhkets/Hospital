import axios from "axios";
import getCookie from "./getCookie";

async function contactRequest(data, patient) {
    const access = getCookie("access")
    try {
        let response = await axios.post(`http://127.0.0.1:8000/auth/visitor/`, {
            phone: data.phone,
            visit_time: `${data.date} ${data.time}`,
            patient: patient,
        }, {
            // headers: {
            //     "Authorization": `JWT ${access}`
            // }
        })
        return true;
    } catch {
        return false;
    }
}
  
export default contactRequest;