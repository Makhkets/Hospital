import axios from "axios";

async function getStatistic(uid, token) {
    try {
        let response = await axios.get("http://encodee.pythonanywhere.com/auth/statistic")
        return response.data
    } catch {
        return false
    }
}
  
export default getStatistic;