import axios from "axios";
import getCookie from "./getCookie"

async function setRequestSolution(id, solution) {
    try {
        const access = getCookie("access")
        let response = await axios.patch(`http://encodee.pythonanywhere.com/auth/visitor/${id}/`, {
            solution: solution 
        }, {
            headers: {
                "Authorization": `JWT ${access}`
            }
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
  
export default setRequestSolution;