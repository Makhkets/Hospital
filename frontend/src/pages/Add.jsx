import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import addPatient from "../actions/add_patient";

const Add = () => {
    const [information, setInformation] = useState(null)
    const [userInfo, userInfoSet] = useState(false)

    const [user, setUser] = useOutletContext();
    const [p, setPatient] = useState({
        first_name: "", last_name: "", patronymic: "",
        pasport_series: "", medical_number: "", branch: "Терапия"
    })

    function patient(e) {
        e.preventDefault()
        

        if (user.is_staff) {
            const first_name = p.first_name
            const last_name = p.last_name
            const patronymic = p.patronymic
            const passport_series = p.pasport_series
            const medical_number = p.medical_number
            const branch = p.branch
            
            if (
                first_name && last_name
                && patronymic && passport_series
                && medical_number && branch  
            ) {

                const f = async () => {
                    const response = await addPatient(first_name, last_name, patronymic,
                            passport_series, medical_number, user.id, branch)
                    userInfoSet(response)     
                }

                f()
                setInformation(true)

                

            } else {
                console.error("Одно из полей пустое!")
                setInformation(false)
                userInfoSet(false)              
            }
        } else {
            console.error("Вы не являетесь доктором!")
            setInformation(false)
            userInfoSet(false)
        }
    }

    function print_information() {
        if (information === null) {
            return (
                <div>

                </div>
            )
        }
        else if (userInfo.error) {
            if (userInfo.error.includes("Ошибка")) {
                return (
                    <div>
                        <p style={{color: "red"}}>{userInfo.error}!</p>      
                    </div>
                )
            }
        }

        else if (information && userInfo) {
            return (
                <div>
                     <p style={{color: "green"}}>Вы успешно добавили пользователя</p>      
                     <p style={{color: "green"}}>Код пациента: <b>{userInfo.id}</b></p>      
                     <p style={{color: "green"}}>Отделение лечения: <b>{userInfo.branch}</b></p>      
                     <p style={{color: "green"}}>Номер палаты: <b>{userInfo.chamber}</b></p>       
                </div>
            )
        }
        else {
            return (
                <div>
                     <p style={{color: "red"}}>Ошибка при добавления пользователя<b /> Перепроверьте все поля!</p>      
                </div>
            )
        }

    }

    return (
        <div className="grid">
            <form className="form login">
                <div className="form__field">
                    <label htmlFor="login__username"><svg className="icon">
                        <use xlinkHref="#icon-user"></use>
                    </svg><span className="hidden">Имя</span></label>
                    <input autoComplete="username" id="login__username" type="text" name="E,a" className="form__input" placeholder="Имя" required 
                    onChange={e => setPatient({...p, first_name: e.target.value})} value={p.first_name} />
                </div>
            
                <div className="form__field">
                    <label htmlFor="login__username__1"><svg className="icon">
                        <use xlinkHref="#icon-user"></use>
                    </svg><span className="hidden">Фамилия</span></label>
                    <input autoComplete="username" id="login__username__11" type="text" name="E,a" className="form__input" placeholder="Фамилия" required
                    onChange={e => setPatient({...p, last_name: e.target.value})} value={p.last_name} />
                </div>

                <div className="form__field">
                    <label htmlFor="login__username__12"><svg className="icon">
                        <use xlinkHref="#icon-user"></use>
                    </svg><span className="hidden">Отчество</span></label>
                    <input autoComplete="username" id="login__username__13" type="text" name="E,a" className="form__input" placeholder="Отчество" required
                    onChange={e => setPatient({...p, patronymic: e.target.value})} value={p.patronymic} />
                </div>

                <div className="form__field">
                    <label htmlFor="login__password"><svg className="icon">
                        <use xlinkHref="#icon-lock"></use>
                    </svg><span className="hidden">Серия и номер паспорта</span></label>
                    <input id="login__password1" type="password" name="password" className="form__input" placeholder="Серия и Номер Паспорта" required 
                    onChange={e => setPatient({...p, pasport_series: e.target.value})} value={p.pasport_series} />
                </div>

                <div className="form__field">
                    <label htmlFor="login__password"><svg className="icon">
                        <use xlinkHref="#icon-lock"></use>
                    </svg><span className="hidden">Номер Мед. Полиса</span></label>
                    <input id="login__passwor2d" type="password" name="password" className="form__input" placeholder="Номер Мед. Полиса" required
                    onChange={e => setPatient({...p, medical_number: e.target.value})} value={p.medical_number} />
                </div>

                <select className="non_strelka" style={{backgroundColor: "var(--loginLabelBackgroundColor)", height: "6vh",
                textAlign: "center", border: "none",}} onChange={e => setPatient({...p, branch: e.target.value})} value={p.branch} required>
                    <option value="Терапия">Терапия</option>
                    <option value="Кардиология">Кардиология</option>
                    <option value="Неврология">Неврология</option>
                    <option value="Хирургическая">Хирургическая</option>
                    <option value="Эндокринология">Эндокринология</option>
                </select>


                <div className="form__field">
                    <input type="submit" value="Зарегистрировать Пациента" onClick={patient} />
                </div>

                {print_information()}
            </form>
        

            
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

export default Add;