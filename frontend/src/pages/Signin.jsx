import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom'
import { signin } from '../actions/signin';
import { getUser } from '../actions/user';
import { Contex } from '../context';

const Signin = () => {

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
    
    const navigate = useNavigate()
    const [data, setData] = useState(
            {username: "", password: ""}
    )
    const [error, setError] = useState(false)
    
    function signIn(e) {
        e.preventDefault()

        
        const username = data.username
        const password = data.password
        
        let response = signin(username, password)

        if (response) {
            navigate("/")
        } else {

        }

    }

    return (
        <>
            <div className="signup">
                <div className="section">
                    <div className="content">
                        <div className="title">
                            <h1>ВХОД</h1>
                        </div>
                        <div className="inputs">
                            <div className="input">
                                <p>Введите логин</p>
                                <input type="text" placeholder="Логин" 
                                onChange={e => setData({...data, username: e.target.value})} value={data.username} />
                            </div>
                            <div className="input">
                                <p>Введите пароль</p>
                                <input type="password" placeholder="Пароль" 
                                onChange={e => setData({...data, password: e.target.value})} value={data.password} />
                            </div>
                            <div className="button">
                                <button onClick={signIn}>
                                    Войти
                                </button>
                            </div>
                            <div className="links">
                                <Link to="/signup/">
                                    Нет аккаунта?  Зарегистрироваться
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="img">
                        {/* <img src="https://images.prom.ua/2605540947_w500_h500_neonovyj-svetilnik-kaktus.jpg" alt="" /> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signin;





{/* <input type="submit" value="Sign In" onClick={signIn} /> */}

{/* <p className="text--center">Not a member? <Link to="/signup">Sign In now</Link> <svg className="icon">
<use xlinkHref="#icon-arrow-right"></use>
</svg></p>

{error ? error.map((el) => (
<p style={{color: "red"}} key={el}>{el}</p>
)) : undefined} */}