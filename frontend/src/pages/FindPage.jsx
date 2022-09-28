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
      

    function getStatePacient(patientState) {
        if (patientState === "Хорошее") {
            return (
                <span style={{color: "green", fontWeight: "bolder"}}>Хорошее</span>
            )
        } else if (patientState === "Среднее") {
            return (
                <span style={{color: "yellow", fontWeight: "bolder"}}>Среднее</span>
            )
        } else {
            return (
                <span style={{color: "red", fontWeight: "bolder"}}>Плохое</span>
            ) 
        }
    }

    function getStatePatientInfo() {
        let ball = 0
        let statePatient = "Хорошее"

        const kislorod = getRandomInt(94, 96)
        const ch_dihanya = getRandomInt(10, 20)
        const temp = getRandomInt(36, 39)
        const davlenie = getRandomInt(100, 150)

        

        if (kislorod === 94) {
            ball++
        }
        if (ch_dihanya < 17) {
            ball++
        }
        if (temp >= 37) {
            ball++
        }
        if (davlenie > 120) {
            ball++
        }

        ball--;

        if (ball === 1) {statePatient = "Хорошее"}
        else if (ball === 2) {statePatient = "Среднее"}
        else if (ball >= 3) {statePatient = "Плохое"}

        return (
            <>
                <li><p>Процент кислорода: <span style={{color: "#748dff", fontWeight: "bolder"}}>{kislorod}%</span></p></li>
                <li><p>Частота дыхания: <span style={{color: "#748dff", fontWeight: "bolder"}}>{ch_dihanya}</span></p></li>
                <li><p>Температура: <span style={{color: "#748dff", fontWeight: "bolder"}}>{temp}°</span></p></li>
                <li><p>Давление: <span style={{color: "#748dff", fontWeight: "bolder"}}>{davlenie}</span></p></li>
                <hr style={{backgroundColor: "red", color: "red"}} />
                <li><p>Состояние пациента: {getStatePacient(statePatient)}</p></li>
            </>
        )
    }

    function getElements() {
        return (
            <>
                {patients.map((el) => (
                    <div className="card" key={el.medical_number}>
                    <h2 style={{color: "#748dff", fontWeight: "bolder", textAlign: "center", fontSize: "20px", marginBottom: "13px"}}>{el.first_name} {el.last_name} <br /> {el.patronymic}</h2>
                    <ul style={{textAlign: "left"}}>
                        <li><h3>Отделение Пациента:<br /> <span style={{color: "#d62727", fontWeight: "bolder"}}>{el.branch}</span></h3></li>
                        <li><h3 style={{marginBottom: "36px"}}>Палата Пациента: <span style={{color: "#d62727", fontWeight: "bolder"}}>{el.chamber}</span></h3></li>
                        <hr style={{backgroundColor: "red", color: "red"}} />
                        {getStatePatientInfo()}
                    </ul>
                    <Link to={"patient/" + el.id}>
                        <button className="blue_led_button">
                            Подробнее
                        </button>
                    </Link>
                    </div>
                ))}
            </>
        );
    }

    return (
        <>
            <div className="flex_container_center" >
                <div className="index_container">
                    {patients ? getElements() : <h1 style={{marginLeft: "4vh"}}>Пусто</h1>}
                </div>
            </div>
        </>
    );
};

export default FindPage;