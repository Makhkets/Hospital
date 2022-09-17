import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom'
import { signup } from '../actions/login';
import { User } from '../actions/user';
import { Contex } from '../context';


const Signup = () => {
    let navigate = useNavigate();
    const {getUser} = useContext(Contex)
    const [user, setUser] = useState(false)
     
    useEffect(() => {
        const result = async () => {
            const data = await getUser()
            if (data)
                setUser(data.data)
            else
                setUser(false)
        }

        result()

        if (user) {
            navigate("/")
        }
    })
    
    
    const [data, setData] = useState(
        {email: "", username: "", password: "", repeatPassword: ""}
    )

    function signUp(e) {
        e.preventDefault()
        
        const email = data.email
        const password = data.password
        const repeatPassword = data.repeatPassword
        const username = data.username

        if (password === repeatPassword) {
            signup(email, username, password)
            navigate("/")

        } else {
            console.error("Пароли не одинаковы");
        }
    }
    
    return (
        <div className="grid">
            <form className="form login">
                <div className="form__field">
                    <label htmlFor="login__username"><svg className="icon">
                        <use xlinkHref="#icon-user"></use>
                    </svg><span className="hidden">Email</span></label>
                    <input autoComplete="username" id="login__username" type="text" name="E,a" className="form__input" placeholder="Email" required 
                    onChange={e => setData({...data, email: e.target.value})} value={data.email} />
                </div>
            
                <div className="form__field">
                    <label htmlFor="login__username__1"><svg className="icon">
                        <use xlinkHref="#icon-user"></use>
                    </svg><span className="hidden">Username</span></label>
                    <input autoComplete="username" id="login__username__1" type="text" name="E,a" className="form__input" placeholder="Username" required 
                    onChange={e => setData({...data, username: e.target.value})} value={data.username}/>
                </div>

                <div className="form__field">
                    <label htmlFor="login__password"><svg className="icon">
                        <use xlinkHref="#icon-lock"></use>
                    </svg><span className="hidden">Password</span></label>
                    <input id="login__password" type="password" name="password" className="form__input" placeholder="Password" required 
                    onChange={e => setData({...data, password: e.target.value})} value={data.password} />
                </div>

                <div className="form__field">
                    <label htmlFor="login__password"><svg className="icon">
                        <use xlinkHref="#icon-lock"></use>
                    </svg><span className="hidden">Repeat Password</span></label>
                    <input id="login__password" type="password" name="password" className="form__input" placeholder="Repeat Password" required 
                    onChange={e => setData({...data, repeatPassword: e.target.value})} value={data.repeatPassword} />
                </div>
        
                <div className="form__field">
                    <input type="submit" value="Sign Up" onClick={signUp} />
                </div>
            </form>
        
            <p className="text--center">Not a member? <Link to="/signin">Sign In Now</Link> <svg className="icon">
                <use xlinkHref="#icon-arrow-right"></use>
            </svg></p>
            

            
            <svg xmlns="http://www.w3.org/2000/svg" className="icons">
                <symbol id="icon-arrow-right" viewBox="0 0 1792 1792">
                <path d="M1600 960q0 54-37 91l-651 651q-39 37-91 37-51 0-90-37l-75-75q-38-38-38-91t38-91l293-293H245q-52 0-84.5-37.5T128 1024V896q0-53 32.5-90.5T245 768h704L656 474q-38-36-38-90t38-90l75-75q38-38 90-38 53 0 91 38l651 651q37 35 37 90z" />
                </symbol>
                <symbol id="icon-lock" viewBox="0 0 1792 1792">
                <path d="M640 768h512V576q0-106-75-181t-181-75-181 75-75 181v192zm832 96v576q0 40-28 68t-68 28H416q-40 0-68-28t-28-68V864q0-40 28-68t68-28h32V576q0-184 132-316t316-132 316 132 132 316v192h32q40 0 68 28t28 68z" />
                </symbol>
                <symbol id="icon-user" viewBox="0 0 1792 1792">
                <path d="M1600 1405q0 120-73 189.5t-194 69.5H459q-121 0-194-69.5T192 1405q0-53 3.5-103.5t14-109T236 1084t43-97.5 62-81 85.5-53.5T538 832q9 0 42 21.5t74.5 48 108 48T896 971t133.5-21.5 108-48 74.5-48 42-21.5q61 0 111.5 20t85.5 53.5 62 81 43 97.5 26.5 108.5 14 109 3.5 103.5zm-320-893q0 159-112.5 271.5T896 896 624.5 783.5 512 512t112.5-271.5T896 128t271.5 112.5T1280 512z" />
                </symbol>
            </svg>
        </div>
    );
};

export default Signup;