import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom'
import { Contex } from '../context';


let CHAT_ID_ = "-1001186656958"
let TOKEN = "5818999369:AAEXGfGhquTjxs8_tuF4VJY39_oXvLoVfFk"

const RequestDoctor = () => {

    const {getUser} = useContext(Contex)
    const [user, setUser] = useState(false)
    
    const navigate = useNavigate()
    const [data, setData] = useState(
            {username: "", password: "", contact: "", trable: ""}
    )
    const [error, setError] = useState(false)
    
    function signIn(e) {
        e.preventDefault()

        const med = data.username
        const dateRequest = data.password
        const contact = data.contact
        const trable = data.trable
        
        const rtext = `❗ Новая заявка\n\Номер полиса: ${med}\nДата: ${dateRequest}\nКонтакты: ${contact}\nОтделение: ${trable}`

        // let z=$.ajax({  
        //     type: "POST",  
        //     url: "https://api.telegram.org/bot"+TOKEN+"/sendMessage?chat_id="+CHAT_ID_,
        //     data: "parse_mode=HTML&text="+encodeURIComponent(rtext), 
        //     }); 
        // };

        fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID_}&text=${encodeURIComponent(rtext)}`, {
            method: 'POST',
            body: JSON.stringify({
                'parse_mode': 'HTML',
            })
        });
        

        setError("Успешно отправлена заявка")
    }

    return (
        <>
            <div className="signup">
                <div className="section">
                    <div className="content">
                        <div className="title">
                            <h1>Запись к врачу</h1>
                        </div>
                        <div className="inputs">
                            <div className="input">
                                <p>Мед. полис</p>
                                <input type="text" placeholder="Номер полиса" 
                                onChange={e => setData({...data, username: e.target.value})} value={data.username} required />
                            </div>
                            <div className="input">
                                <p>Введите дату рождения</p>
                                <input type="text" placeholder="Дата" 
                                onChange={e => setData({...data, password: e.target.value})} value={data.password} required />
                            </div>
                            <div className="input">
                                <p>Ваши контактные данные</p>
                                <input type="text" placeholder="Контактные данные" 
                                onChange={e => setData({...data, contact: e.target.value})} value={data.contact} required />
                            </div>
                            <div className="input">
                                <p>Отделение</p>
                                <select class="form-control js-example-tags"
                                        onChange={e => setData({...data, trable: e.target.value})} value={data.trable} required>
                                            <option selected="selected" value="Терапия">Терапия</option>
                                            <option value="Кардиология">Кардиология</option>
                                            <option value="Неврология">Неврология</option>
                                            <option value="Хирургическая">Хирургическая</option>
                                            <option value="Эндокринология">Эндокринология</option>
                                </select>

                            </div>
                            <div className="button">
                                <button onClick={signIn}>
                                    Записаться
                                </button>
                            </div>
                            {error ? 
                                <div className="links">
                                        <p color='green'>{error}</p>
                                </div>
                            : ""}
                        </div>
                    </div>
                    <div className="img">
                        <img src="https://i.pinimg.com/564x/42/a3/77/42a3775ce8e94ab6d6823e89141636f2.jpg" alt="" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default RequestDoctor;





{/* <input type="submit" value="Sign In" onClick={signIn} /> */}

{/* <p className="text--center">Not a member? <Link to="/signup">Sign In now</Link> <svg className="icon">
<use xlinkHref="#icon-arrow-right"></use>
</svg></p>

{error ? error.map((el) => (
<p style={{color: "red"}} key={el}>{el}</p>
)) : undefined} */}