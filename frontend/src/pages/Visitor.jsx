import axios from "axios";
import setRequestSolution from "../actions/change_request";
import getCookie from "../actions/getCookie";
import getVisitors from "../actions/get_visitors";

import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Visitor = () => {
    const [patients, setPatients] = useState(0)
    const [user, setUser] = useState(
            {
                0: {
                    patient: {}
                }
            }
    )

    const [lastId, setLastId] = useState([0])

    useEffect(() => {
        (async () => {
            const data = await getVisitors()
            setPatients(data)
        })()
    }, [])


    const removeItem = (index) => {
        setPatients([
                   ...patients.slice(0, index),
                   ...patients.slice(index + 1)
                 ]);
      }

    function accept(request, patient_index) {
        setRequestSolution(request, true)
        removeItem(patient_index)
    }

    function reject(request, patient_index) {
        setRequestSolution(request, false)
        removeItem(patient_index)
    }

    function returnUserData(id) {
        if (id in lastId) {} else {
            setLastId(current => [...current, id])
            // axios.get(`http://127.0.0.1:8000/auth/patients/${id}/`, {
            axios.get(`http://encodee.pythonanywhere.com/auth/patients/${id}/`, {
                // headers: {
                //     "Authorization": "JWT " + getCookie('access')
                // }
            }).then((response) => {
                setUser(prevState => ({
                    ...prevState,
                    [id]: response.data
                }))
            })
        }
    }

    if (patients) {
        return (
            <>
                <div className="branch_container">
                    <div className="branches1">
                        {patients ?
                            patients.map((el, index) => {
                            returnUserData(el.patient)
                                try {
                                    let userVariable = user[el.patient]
                                    return (
                                        <div className="branch1" key={index}>
                                            <h1 style={{color: "#28a745", fontSize: "22px"}}>{userVariable.first_name} {userVariable.last_name}</h1>
                                            
                                            <ul style={{marginTop: "21px", marginBottom: "21px", fontSize: "15px"}}>
                                                <li>ID: {userVariable.id}</li>
                                                <li>Палата: {userVariable.chamber}</li>
                                                <li>Отделение: {userVariable.branch}</li>
                                                <li>Посетитель хочет прийти в: <span style={{color: "#28a745", fontWeight: "bolder"}}>{el.visit_time}</span></li>
                                                <li>Номер телефона посетителя: <span style={{color: "#28a745", fontWeight: "bolder"}}>{el.phone}</span></li>
                                            </ul>

                                            <button className="button_success" onClick={() => accept(el.id, index)}>Одобрить</button>
                                            <button className="button_primary" onClick={() => reject(el.id, index)} style={{marginLeft: "20px", backgroundColor: "red"}}>Отклонить</button>
                                        </div>
                                    )
                                } catch {
                                    return <h1></h1>
                                }
                            })
                        : <h1>Пусто</h1>}
                    </div>
                </div>
            </>
        );
    } else {}
};

export default Visitor;