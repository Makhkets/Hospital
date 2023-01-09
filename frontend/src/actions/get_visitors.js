import axios from "axios";
import getCookie from "./getCookie"

async function getVisitors() {
    try {
        const access = getCookie("access")
        let response = await axios.get("http://127.0.0.1:8000/auth/visitor/", {
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