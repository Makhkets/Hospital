import axios from "axios";
import getCookie from "./getCookie"

async function setRequestSolution(id, solution) {
    try {
        const access = getCookie("access")
        let response = await axios.patch(`http://127.0.0.1:8000/auth/visitor/${id}/`, {
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