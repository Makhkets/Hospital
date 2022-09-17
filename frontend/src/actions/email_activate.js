import axios from "axios";

async function confirmEmail(uid, token) {
    let response = await axios.post(`http://127.0.0.1:8000/auth/users/activation/`, {
        uid: uid,
        token: token
    })

    console.log(response)
    console.log(response)
    console.log(response)
    console.log(response)
    console.log(response)

}
  
export default confirmEmail;