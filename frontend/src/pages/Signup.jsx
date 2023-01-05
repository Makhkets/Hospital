import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom'
import { signup } from '../actions/login';
import { User } from '../actions/user';
import { Contex } from '../context';


const Signup = (props) => {
    let navigate = useNavigate();

    if (props.flag) {
        navigate("/")
    }
    
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
        <>
            <div className="login_wrapper_1">
                <div className="login">
                    <div className="section">
                        <div className="content">
                            <div className="title">
                                <h1 style={{marginTop: "2%"}}>Регистрация</h1>
                            </div>
                            <div className="inputs">
                                <div className="input">
                                    <p>E-mail</p>
                                    <input type="mail" placeholder="Введите E-mail" 
                                     onChange={e => setData({...data, email: e.target.value})} value={data.email} />
                                </div>
                                <div className="input">
                                    <p>Логин</p>
                                    <input type="text" placeholder="Введите логин"
                                    onChange={e => setData({...data, username: e.target.value})} value={data.username} />
                                </div>
                                <div className="input">
                                    <p>Пароль</p>
                                    <input type="password" placeholder="Введите пароль"
                                    onChange={e => setData({...data, password: e.target.value})} value={data.password} />
                                </div>
                                <div className="input">
                                    <p>Повторите пароль</p>
                                    <input type="password" placeholder="Повторный пароль"
                                    onChange={e => setData({...data, repeatPassword: e.target.value})} value={data.repeatPassword} />
                                </div>


                                
                                <div className="button">
                                    <button onClick={signUp}>
                                    Зарегистрироваться
                                    </button>
                                </div>
                                <div className="links">
                                    <a className="text--center"><Link to="/signin">
                                    У вас уже есть аккаунт?     Войти в аккаунт
                                            </Link>
                                            <svg className="icon">
                                        <use xlinkHref="#icon-arrow-right"></use>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="img">
                            {/* <img src="https://i.pinimg.com/474x/61/c7/b6/61c7b6d2e052340362b3993abb99df38.jpg" alt="" /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

















{/* <p className="text--center">Not a member? <Link to="/signin">Sign In Now</Link> <svg className="icon">
<use xlinkHref="#icon-arrow-right"></use>
</svg></p> */}

export default Signup;