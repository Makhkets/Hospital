
import { useState } from "react";
import { getPatients } from "../actions/get_patients";
import { Link } from "react-router-dom";
import { useEffect } from "react";


const Index = () => {

    const [patients, setPatients] = useState(false)
    const [badPatients, setBadPatients] = useState(false)




    const state = ["Хорошее", "Среднее", "Плохое"]

    
    useEffect(() => {
        (async () => {
            const data = await getPatients()
            setPatients(data)
        })()
    }, []);
    
    useEffect(() => {
        if (patients) {
            patients.map((el, index) => {
                if (el.check) {} else {
                    if (el.statePatient === "Плохое") {
                        if (badPatients) {

                            setBadPatients([...badPatients, el])
                            const myNewArray = Object.assign([...patients], {
                                [index]: {
                                    ...patients[index],
                                    statePatient: "Плохое",
                                    check: true
                                }
                            });
                            setPatients(myNewArray);

                        } else {
                            setBadPatients([el])
                            const myNewArray = Object.assign([...patients], {
                                [index]: {
                                    ...patients[index],
                                    statePatient: "Плохое",
                                    check: true
                                }
                            });
                            setPatients(myNewArray);
                        }
                    } else {
                    }
                }
            })
        }
        console.log(badPatients)
    })
    
    function arrayRandElement(arr) {
        var rand = Math.floor(Math.random() * arr.length);
        return arr[rand];
    }

    const removeBadPatient = (index) => {
        setBadPatients([
                   ...badPatients.slice(0, index),
                   ...badPatients.slice(index + 1)
                 ]);
      }

    function contains(arr, elem) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === elem) {
                return true;
            }
        }
        return false;
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
                <span style={{color: "red", fontWeight: "bolder"}}>Плохое</span>
            ) 
        } if (patientState === "Хорошее") {
            return (
                <span style={{color: "green", fontWeight: "bolder"}}>Хорошее</span>
            )
        } if (patientState === "Среднее") {
            return (
                <span style={{color: "yellow", fontWeight: "bolder"}}>Среднее</span>
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
    
    
    
            if (ball === 1) {statePatient = "Хорошее"}
            else if (ball === 2) {statePatient = "Среднее"}
            else if (ball >= 3) {
                statePatient = "Плохое"
            }
    
            ball--;
    
    
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
                            <h2 style={{color: "#748dff", fontWeight: "bolder", textAlign: "center", fontSize: "20px", marginBottom: "13px"}}>{el.first_name} {el.last_name} <br /> {el.patronymic}</h2>
                            <ul style={{textAlign: "left"}}>
                                <li><h3>Отделение Пациента:<br /> <span style={{color: "#d62727", fontWeight: "bolder"}}>{el.branch}</span></h3></li>
                                <li><h3 style={{marginBottom: "36px"}}>Палата Пациента: <span style={{color: "#d62727", fontWeight: "bolder"}}>{el.chamber}</span></h3></li>
                                <hr style={{backgroundColor: "red", color: "red"}} />
                                {getStatePatientInfo(el, index)}
                                <li><p>Процент кислорода: <span style={{color: "#748dff", fontWeight: "bolder"}}>{el.kislorod}%</span></p></li>
                                <li><p>Частота дыхания: <span style={{color: "#748dff", fontWeight: "bolder"}}>{el.ch_dihanya}</span></p></li>
                                <li><p>Температура: <span style={{color: "#748dff", fontWeight: "bolder"}}>{el.temp}°</span></p></li>
                                <li><p>Давление: <span style={{color: "#748dff", fontWeight: "bolder"}}>{el.davlenie}</span></p></li>
                                <hr style={{backgroundColor: "red", color: "red"}} />
                                <li><p>Состояние пациента: {getStatePacient(el.statePatient)}</p></li>
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
    }

    function onCloseWindowPatient(index) {
        removeBadPatient(index)
    }

    function startAudio() {
        var audio = document.createElement("AUDIO")
        document.body.appendChild(audio);
        audio.src = "https://zvukitop.com/wp-content/uploads/2020/09/Signalizacya-9" // Заменить звук сигнализации .mp3
        
        document.body.addEventListener("click", function () {
            audio.play()
        })
    }

    function getBadPatientElements() {
        return (
            <>
                {badPatients.map((el, index) => (

                    
                    <>
                        {startAudio()}
                        <div className="card" key={String(index) + "1"}>
                        <h2 style={{color: "#748dff", fontWeight: "bolder", textAlign: "center", fontSize: "20px", marginBottom: "13px"}}>{el.first_name} {el.last_name}</h2>
                        <ul style={{textAlign: "left"}}>
                            <li><p>{el.statePatient}</p></li>
                            <li><p>Отделение: Неврология</p></li>
                            <li><p>Палата: 5</p></li>
                        </ul>
                        <Link to={"patient/" + el.id}>
                            <button className="blue_led_button_no_effect" style={{backgroundColor: "white"}}>
                                    Подробнее
                            </button>
                        </Link>
                        <br />
                        <br />
                            <button className="blue_led_button_no_effect" style={{backgroundColor: "black"}} onClick={() => onCloseWindowPatient(index)}>
                                Закрыть
                            </button>
                        </div>
                    </>
                ))}
            </>
        );
    }

    return (
        <>
            {badPatients ?
                <> 
                    <div className="flex_container_center" style={{backgroundColor: "black", paddingTop: "2%", marginBottom: "2%"}} >
                        <div className="index_container1">
                            {patients ? getBadPatientElements() : undefined}
                        </div>
                    </div>

                </>
            : undefined}


            <div className="flex_container_center" >
                <div className="index_container">
                    {patients ? getElements() : <h1 style={{marginLeft: "4vh"}}>Пусто</h1>}
                </div>
            </div>
        </>
    );
};

export default Index;
