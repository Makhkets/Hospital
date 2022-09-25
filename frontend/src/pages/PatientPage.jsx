import { useState } from "react";
import { useParams } from "react-router-dom";
import { getPatient } from "../actions/get_patient";
import { getHistoryPatient } from "../actions/get_history_patient";
import { useEffect } from "react";

import extractPatient from "../actions/extract_patient";
import addHistoryAction from "../actions/add_history_action";

const PatientProfile = () => {
    let params = useParams()

    const [flag, setFlag] = useState(false)
    const [report, setReport] = useState(0)

    
    const [checkId, checkIdSet] = useState(0)
    const [info, setInfo] = useState(0)

    const [patient, setPatient] = useState(0)


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
            <td className="patient_first_td">Температура:</td>
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
                    <td className="patient_first_td">Проверка пациента была в:</td>
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
                          <button className="button_success" onClick={patientExtractF}>Выписать Пациента</button>
                          <button className="button_success" style={{marginLeft: "1%"}} onClick={() => postAction('Пациент проверен')}>Проверить Пациента</button>
                        </div>
                        <div className="row" style={{marginTop: "1%"}}>
                          <button className="button_primary" onClick={() => postAction('Сделан Укол')}>Сделан Укол</button>
                          <button className="button_primary" onClick={() => postAction('Сделана Капельница')} style={{marginLeft: "1%"}}>Сделана Капельница</button>
                          <button className="button_primary" onClick={() => postAction('Сделана Перевязка')} style={{marginLeft: "1%"}}>Сделана Перевязка</button>
                          <button className="button_primary" onClick={() => postAction('Намазана Мазь')} style={{marginLeft: "1%"}}>Намазана Мазь</button>
                        </div>
                        
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