import axios from "axios";
import getCookie from "./getCookie";

async function contactRequest(data, patient) {
    const access = getCookie("access")
    try {
        let response = await axios.post(`http://encodee.pythonanywhere.com/auth/visitor/`, {
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