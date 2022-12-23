import axios from "axios";
import getCookie from "./getCookie";

async function addHistoryAction(action, patient) {
    try {
        const access = getCookie("access")
        let today = new Date();
        const Hour = today.getHours();
        const Minutes = today.getMinutes();
        const Seconds = today.getSeconds();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        
        today = mm + '/' + dd + '/' + yyyy + ` ${Hour}:${Minutes}:${Seconds}`;
        const report = `${action} в ${today} , Пациент: ${patient.first_name} ${patient.last_name} ${patient.patronymic}`

        let localhostUri = `http://127.0.0.1:8000/auth/actionHistory/`
        let tempUri = `http://encodee.pythonanywhere.com/auth/actionHistory/`

        let response = await axios.post(tempUri, {
            action: report,
            user: patient.id,
        }, {
            headers: {
                "Authorization": `JWT ${access}`
            }
        })
        return response.data
    } catch(e) {
        if (e.response.data.error) {return e.response.data.error}
        return false
    }
}
  
export default addHistoryAction;