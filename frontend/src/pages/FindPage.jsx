import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { findtPatient } from "../actions/find_patient";

const FindPage = () => {
    let params = useParams()

    const [patients, setPatients] = useState(false)
    const state = ["Хорошее", "Среднее", "Плохое"]

    useEffect(() => {
        (async () => {
            const data = await findtPatient(params.patient)
            setPatients(data)
        })()
    }, []);



    function arrayRandElement(arr) {
        var rand = Math.floor(Math.random() * arr.length);
        return arr[rand];
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }
      
      function setKeyOfValue(
        prev, index,
        kislorod, ch_dihanya, temp, davlenie, statePatient
    ) {
        const next = [...prev];
        next[index] = {
             ...prev[index],
            
            kislorod: kislorod,
            ch_dihanya: ch_dihanya,
            temp: temp,
            davlenie: davlenie,
            statePatient: statePatient,
            check: false,

        };
        return next;
    };

      function getStatePacient(patientState) {
        if (patientState === "Плохое") {
            return (
                <span style={{color: "red", fontWeight: "bolder"}}>Плохое состояние</span>
            ) 
        } if (patientState === "Хорошее") {
            return (
                <span style={{color: "green", fontWeight: "bolder"}}>Хорошее состояние</span>
            )
        } if (patientState === "Среднее") {
            return (
                <span style={{color: "yellow", fontWeight: "bolder"}}>Среднее состояние</span>
            )
        }
    }

    function getStatePatientInfo(user, index) {
        if (user.kislorod) { } else {
            let ball = 0
            let statePatient = "Хорошее"
    
            const kislorod = getRandomInt(94, 96)
            const ch_dihanya = getRandomInt(10, 20)
            const temp = getRandomInt(36, 39)
            const davlenie = getRandomInt(100, 150)
    
    
            if (kislorod === 95) {
                ball++
            }
            if (ch_dihanya < 18) {
                ball++
            }
            if (temp >= 38) {
                ball++
            }
            if (davlenie > 125) {
                ball++
            }
    
    
            if (ball === 1) {statePatient = "Хорошее"}
            else if (ball === 2) {statePatient = "Среднее"}
            else if (ball >= 3) {
                statePatient = "Плохое"
            }
    
            if (user.check) {

            } else {
                const response = setKeyOfValue(
                    patients, index,
                    kislorod, ch_dihanya, temp, davlenie,
                    statePatient
                )
                setPatients(response)
            }
        }

    }

    function getElements() {
        if (patients) {
            return (
                <>
                    {patients.map((el, index) => (
                        <div className="card" key={index}>
                            {getStatePatientInfo(el, index)}
                            <div className="time">
                                <p>{(new Date(el.last_create)).toString().split("GMT")[0]}</p>
                            </div>
                            <div className="state">
                                {getStatePacient(el.statePatient)}
                            </div>
                            <div className="human">
                                {el.first_name} {el.last_name}
                            </div>
                            <Link to={"/patient/" + el.id}>
                                <div className="buttons">
                                    <button>ПОДРОБНЕЕ</button>
                                </div>
                            </Link>
                        </div>
                    ))}
                </>
            );
        }
    }

    return (
        <>
            <div className="flex_container_center" >
                <div className="index_container">
                    <div className="grade">
                        <div className="title">
                            <h1>Список <span>Пациентов</span></h1>
                        </div>
                        <div className="cards">
                            <div className="card" style={{backgroundColor: "#0b0b11", borderRadius: "0px"}}>
                                <div className="time">
                                    <p>Дата</p>
                                </div>
                                <div className="state">
                                    Текущее состояние
                                </div>
                                <div className="human">
                                    Имя и Фамилие пациента
                                </div>
                                <div className="buttons">
                                    <p>Подробнее</p>
                                </div>
                            </div>
                            {patients ? getElements() : <h1 style={{marginLeft: "4vh"}}>Пусто</h1>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FindPage;