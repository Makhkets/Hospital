import axios from "axios";
import getCookie from "./getCookie"

async function getVisitors() {
    try {
        const access = getCookie("access")
        let response = await axios.get("http://encodee.pythonanywhere.com/auth/visitor/", {
            // headers: {
            //     "Authorization": `JWT ${access}`
            // }
        })
        if (response.data) {
            return response.data;
        } else {
            return false;
        }
    } catch {
        return false;
    }
}
  
export default getVisitors;