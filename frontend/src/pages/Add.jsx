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
                <div className="error">
                </div>
            )
        }
        else if (userInfo.error) {
            if (userInfo.error.includes("Ошибка")) {
                return (
                    <div className="error">
                        <p>Ошибка при добавления пользователя<b /> Перепроверьте все поля!</p>      
                    </div>
                )
            }
        }

        else if (information && userInfo) {
            return (
                <div className="success">
                    <div>
                        <p>Вы успешно<br /> добавили пользователя</p>
                        
                    </div>
                    <div>
                        <p>Код пациента:</p>
                        <span>{userInfo.id}</span>
                    </div>
                    <div>
                        <p>Отделение лечения:</p>      
                        <span>{userInfo.branch}</span>
                    </div>
                    <div>
                        <p>Номер палаты</p>
                        <span>{userInfo.chamber}</span>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>

                </div>
            )
        }
    }

    return (
        <div className="login_wrapper_2">
                <div className="login">
                    <div className="section">
                        <div className="content">
                            <div className="title">
                                <h1 style={{marginTop: "2%"}}>Регистрация <span>Пациента</span></h1>
                            </div>
                            <div className="inputs">
                                <div className="input">
                                    <p>Имя</p>
                                    <input type="text" placeholder="Имя" 
                                    onChange={e => setPatient({...p, first_name: e.target.value})} value={p.first_name}  />
                                </div>

                                <div className="input">
                                    <p>Фамилие</p>
                                    <input type="text" placeholder="Фамилие"
                                    onChange={e => setPatient({...p, last_name: e.target.value})} value={p.last_name} />
                                </div>

                                <div className="input">
                                    <p>Отчество</p>
                                    <input type="text" placeholder="Отчество"
                                    onChange={e => setPatient({...p, patronymic: e.target.value})} value={p.patronymic} />
                                </div>

                                <div className="input">
                                    <p>Серие и номер паспорта</p>
                                    <input type="text" placeholder="Серия и номер"
                                    onChange={e => setPatient({...p, pasport_series: e.target.value})} value={p.pasport_series} />
                                </div>

                                <div className="input">
                                    <p>Мед. Полис</p>
                                    <input type="text" placeholder="Мед. Полис"
                                    onChange={e => setPatient({...p, medical_number: e.target.value})} value={p.medical_number} />
                                </div>
                                <div className="input">
                                    <p>Выберите отдел</p>
                                    <select class="form-control js-example-tags"
                                        onChange={e => setPatient({...p, branch: e.target.value})} value={p.branch} required>
                                            <option selected="selected" value="Терапия">Терапия</option>
                                            <option value="Кардиология">Кардиология</option>
                                            <option value="Неврология">Неврология</option>
                                            <option value="Хирургическая">Хирургическая</option>
                                            <option value="Эндокринология">Эндокринология</option>
                                    </select>


                                </div>
                            </div>
                            <div className="button">
                                <button onClick={patient}>
                                    Зарегистрироваться
                                </button>
                            </div>
                            
                            {print_information()}

                        </div>
                        <div className="img">
                            <img src="https://i.pinimg.com/564x/0e/ba/eb/0ebaeb4bd9d630cec5329dd54c2ce67c.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
    );
};

// onChange={e => setPatient({...p, first_name: e.target.value})} value={p.first_name}
// onChange={e => setPatient({...p, last_name: e.target.value})} value={p.last_name}
// onChange={e => setPatient({...p, patronymic: e.target.value})} value={p.patronymic}

// onChange={e => setPatient({...p, pasport_series: e.target.value})} value={p.pasport_series}

// onChange={e => setPatient({...p, medical_number: e.target.value})} value={p.medical_number}

// onChange={e => setPatient({...p, branch: e.target.value})} value={p.branch} |||select|||




export default Add;