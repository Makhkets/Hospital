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
        {console.log(report)}
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
      
      if (date.getMonth() + 1 > 9) {month = `${month=11}`} else {month = `0${date.getMonth() + 1}`}
        var today123 = new Date();
        var dd = String(today123.getDate()).padStart(2, '0');
        var mm = String(today123.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today123.getFullYear();
        let mininputdate = yyyy + '-' + mm + '-' + dd;

      
      return (
        <>
          <div className="row_forms">
            <form className="form_login">
              <div className="field">
                <p>Номер телефона</p>
                <input type="phone" placeholder="Телефон" onChange={e => setContact({...contact, phone: e.target.value})} value={contact.phone} />
              </div>
              <div className="field">
                <p>Дата</p>
                <input type="date" placeholder="Дата" min={mininputdate} required onChange={e => setContact({...contact, date: e.target.value})} value={contact.date} />
              </div>
              <div className="field">
                <p>Время</p>
                <input type="time" placeholder="Время" onChange={e => setContact({...contact, time: e.target.value})} value={contact.time} />
              </div>

              <div className="button">
                <button onClick={postContactRequest}>
                  Записаться
                </button>
              </div>
            </form>
          </div>



          {/* onChange={e => setContact({...contact, date: e.target.value})} value={contact.date} */}
          
          {/* min={toDayDate} */}

          {/* onChange={e => setContact({...contact, time: e.target.value})} value={contact.time} */}

          {/* onClick={postContactRequest} */}

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
    
                      <div className="patient_description">
                        <h1>История действий</h1>
                        <ul style={{marginTop: "1.5%", width: "56%", fontSize: "15px"}}>
                            {getHistory()}
                        </ul>
                      </div>
                      <div className="wrapper_patient_buttons">
                        <div className="patient_buttons">
                          
                          
                          <div className="row">
                            <button className="button_success" onClick={patientExtractF}>Выписать Пациента</button>
                            <button className="button_success" onClick={() => postAction('Пациент проверен')}>Проверить Пациента</button>
                          </div>
                          
                          
                          <div className="row">
                            <button className="button_primary" onClick={() => postAction('Сделан Укол')}>Укол</button>
                            <button className="button_primary" onClick={() => postAction('Сделана Капельница')}>Капельница</button>
                          </div>
                          <div className="row">
                            <button className="button_primary" onClick={() => postAction('Сделана Перевязка')}>Перевязка</button>
                            <button className="button_primary" onClick={() => postAction('Намазана Мазь')}>Мазь</button>
                          </div>
                          
                          <div className="row">
                            <button className="button_other" onClick={show}>Посетить посетителя</button>
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