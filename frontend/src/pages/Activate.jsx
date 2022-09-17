import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import confirmEmail from "../actions/email_activate";

const Activate = () => {
    let params = useParams()
    const navigate = useNavigate()

    function activateEffect(e) {
        e.preventDefault()

        const result = async () => {
            await confirmEmail(params.uid, params.token)
            navigate("/signin")
        }

        result()

        // if (user) {
        //     navigate("/")
        // }

    }

    return (
        <div className="grid">
            <form className="form login" onSubmit={activateEffect}>
                <div className="form__field">
                    <input type="submit" value="Подтвердить почту" />
                </div>
            </form>
        </div>
    );
};

export default Activate;