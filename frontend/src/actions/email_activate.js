import axios from "axios";

async function confirmEmail(uid, token) {
    let response = await axios.post(`http://encodee.pythonanywhere.com/auth/users/activation/`, {
        uid: uid,
        token: token
    })
}
  
export default confirmEmail;