import { useState } from "react";
import { useParams } from "react-router-dom";
import { getPatient } from "../actions/get_patient";
import { getHistoryPatient } from "../actions/get_history_patient";
import { useEffect } from "react";

import extractPatient from "../actions/extract_patient";
import addHistoryAction from "../actions/add_history_action";
import contactRequest from "../actions/contact_request";

const PatientProfile = () => {
    let params = useParams()

    const [flag, setFlag] = useState(false)
    const [report, setReport] = useState(0)
    const [checkId, checkIdSet] = useState(0)
    const [info, setInfo] = useState(0)
    const [patient, setPatient] = useState(0)
    
    const [checkOpen, setChekOpen] = useState(0)
    const [contact, setContact] = useState({
                              phone: "",
                              date: "",
                              time: "",
                        })

      useEffect(() => {
        if (info) {
          if (info.id === checkId) {return}
          else {
            checkIdSet(info.id)            
            setReport(
              prev => prev.concat({
                ...info
              })
            )
          }
        }
      })  


    const result = async () => {
        if (patient === 0) {
            const data = await getPatient(params.id)
            if (data) {
                setPatient(data.data)
            }
            else {
                setPatient(false)
            }

            const getHistory1 = await getHistoryPatient(data.data.id)      
            setReport(getHistory1)
            setFlag(true)
          }
    }
    result()

    function postAction(action) {
      const postAction1 = async (action) => {
        const data = await addHistoryAction(action, patient)
        setInfo(data)
      }
      postAction1(action)
    }

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    function lastCreate(date1) {
      const date = new Date(date1).toString()
      let string = ""
      date.split(" ").slice(1, 5).forEach(element => {
        string += `${element} `
      });
      return string;
    }

    function getInfoStatePatient() {
      const kislorod = getRandomInt(94, 96)
      const ch_dihanya = getRandomInt(10, 20)
      const temp = getRandomInt(36, 39)
      const davlenie = getRandomInt(100, 150)

      return (
      <div id="table-container"><table>
        <tbody>
          <tr>
            <td className="patient_first_td">Процент кислорода</td>
            <td>{kislorod}</td>
          </tr>
          <tr>
            <td className="patient_first_td">Частота дыхания</td>
            <td>{ch_dihanya}</td>
          </tr>
          <tr>
            <td className="patient_first_td">Температура</td>
            <td>{temp}</td>
          </tr>
          <tr>
            <td className="patient_first_td">Давление</td>
            <td>{davlenie}</td>
          </tr>
        </tbody>
        </table>
      </div>)
    }

    function getHistory() {
      return (
        <>
          {report ?
            <div>
                {report.map((el) => {
                  return <li key={el.id}>{el.action}</li>
                })}
            </div>
          : <li>Пусто</li>
          }
        </>
      )
    }

    function patientExtractF() {
      const extract = async (patient) => {
        const data = await extractPatient(patient)
        setInfo(data)
      }
      extract(patient.id)
      postAction("Пациент Выписан")
    }

    function postContactRequest(e) {
      e.preventDefault()
      const f = async () => {
        const response = await contactRequest(contact, patient.id)
        setInfo(response)
        setContact({
          phone: "",
          date: "",
          time: "",
        })    
    }
    f()

    }

    function posetPatient() {
      const date = new Date()
      let today = ""
      let month = ""
      
      if (date.getMonth() + 1 > 9) {month = `${month++}`} else {month = `0${date.getMonth() + 1}`}
      const toDayDate = `${date.getFullYear()}-${month}-${date.getDate()}`
      
      return (
        <>
          <div className="row" style={{width: "25%", marginLeft: "37%", marginTop: "2%"}}>
            <form className="form login">
                <div className="form__field">
                    <label htmlFor="login__username"><svg className="icon">
                        <use xlinkHref="#icon-user"></use>
                    </svg><span className="hidden">Phone</span></label>
                    <input autoComplete="username" id="login__username" type="number" name="username" className="form__input" placeholder="Номер телефона" required
                    style={{backgroundColor: "var(--loginInputBackgroundColor)", paddingLeft: "15px"}} 
                    onChange={e => setContact({...contact, phone: e.target.value})} value={contact.phone} />
                </div>
            
                <div className="form__field">
                    <label htmlFor="login__username"><svg className="icon">
                        <use xlinkHref="#icon-user"></use>
                    </svg><span className="hidden">Date</span></label>
                    <input autoComplete="username" id="login__username" type="date" name="username" className="form__input" placeholder="Дата" required
                    style={{backgroundColor: "var(--loginInputBackgroundColor)", paddingLeft: "15px"}} min={toDayDate} 
                    onChange={e => setContact({...contact, date: e.target.value})} value={contact.date} />
                </div>

                <div className="form__field">
                    <label htmlFor="login__username"><svg className="icon">
                        <use xlinkHref="#icon-user"></use>
                    </svg><span className="hidden">Phone</span></label>
                    <input autoComplete="username" id="login__username" type="time" name="username" className="form__input" placeholder="Дата" required
                    style={{backgroundColor: "var(--loginInputBackgroundColor)", paddingLeft: "15px"}} 
                    onChange={e => setContact({...contact, time: e.target.value})} value={contact.time} />
                </div>
            
                <div className="form__field">
                    <input type="submit" value="Отправить заявку на посещение" onClick={postContactRequest} />
                </div>
            </form>
          </div>


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

        </>
      );
    };

    function show() {
      if (checkOpen) {
        setChekOpen(false)
      } else {
        setChekOpen(true)
      }
    }

    if (!flag) {
      // Не успел загрузиться
    }
    else {
      return (
          <>
            {patient ? 
              <div className="patient_container">
                <div className="patient_title">
                  <h1 style={{textAlign: "center"}}>{patient.first_name} {patient.last_name} {patient.patronymic}</h1>
                </div>

                <div className="tbody_flex">

                <div id="table-container"><table>
                  <tbody>
                  <tr>
                    <td className="patient_first_td">ФИО</td>
                    <td>{patient.first_name} {patient.last_name} {patient.patronymic}</td>
                  </tr>
                  <tr>
                    <td className="patient_first_td">Время заезда</td>
                    <td>{lastCreate(patient.last_create)}</td>
                  </tr>
                  <tr>
                    <td className="patient_first_td">Проверка пациента была в</td>
                    <td>{lastCreate(patient.updated)}</td>
                  </tr>
                  <tr>
                    <td className="patient_first_td">Серия и Номер Паспорта</td>
                    <td>{patient.series}</td>
                  </tr> 
                  <tr>
                    <td className="patient_first_td">Номер МЕД. Полиса</td>
                  <td>{patient.medical_number}</td>
                  </tr>
                  <tr>
                    <td className="patient_first_td">Отделение</td>
                    <td>{patient.branch}</td>
                  </tr>
                  <tr>
                    <td className="patient_first_td">Палата</td>
                    <td>{patient.chamber}</td>
                  </tr>
                  </tbody>
                  </table></div>
                      {getInfoStatePatient()}
                </div>

                <div className="patient_square" style={{textAlign: "center"}}>
                  <div className="patient_title">
                    <h1 style={{textAlign: "center", marginTop: "3%", marginBottom: "1.2%"}}>Действия</h1>
                      <div className="patient_buttons">
                        <div className="row">
                          <button className="button_other" style={{marginBottom: "10px"}} onClick={show}>Посетить посетителя</button>
                        </div>
                        <div className="row">
                          <button className="button_success" onClick={patientExtractF}>Выписать Пациента</button>
                          <button className="button_success" style={{marginLeft: "1%"}} onClick={() => postAction('Пациент проверен')}>Проверить Пациента</button>
                        </div>
                        <div className="row" style={{marginTop: "1%"}}>
                          <button className="button_primary" onClick={() => postAction('Сделан Укол')}>Сделан Укол</button>
                          <button className="button_primary" onClick={() => postAction('Сделана Капельница')} style={{marginLeft: "1%"}}>Сделана Капельница</button>
                          <button className="button_primary" onClick={() => postAction('Сделана Перевязка')} style={{marginLeft: "1%"}}>Сделана Перевязка</button>
                          <button className="button_primary" onClick={() => postAction('Намазана Мазь')} style={{marginLeft: "1%"}}>Намазана Мазь</button>
                        </div>
                        

                        {checkOpen ? 
                  
                          posetPatient()
                  
                        : undefined}



                        {(() => {
                          if (info === 0) {
                            return (
                              <p></p>
                            )
                          }
                          else if (info) {
                            return (
                              <p style={{color: "green"}}>Успешно добавил отчет</p>
                            )
                          } else {
                            return (
                              <p style={{color: "red"}}>Ошибка при добавлении отчета</p>
                            )
                          }
                        })()}                       
                      </div>      
                      <hr  style={{marginTop: "15px", width: "50%", marginLeft: "25%"}} />
    
                      <div className="patient_description">
                        <h1>История действий</h1>
                        <ul style={{marginTop: "1.5%"}}>
                            {getHistory()}
                        </ul>
                      </div>
                  </div>
                </div>
              </div>
            : 
              <h1>Не найден</h1>
            }
          </>
      );
    }
};

export default PatientProfile