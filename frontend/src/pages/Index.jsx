
import { useState } from "react";
import { getPatients } from "../actions/get_patients";
import { Link } from "react-router-dom";
import { useEffect } from "react";


const Index = () => {

    const [patients, setPatients] = useState(false)
    const [badPatients, setBadPatients] = useState(false)
    const state = ["Удовлетворительное", "Среднее", "Критическое"]

    const [hideElements, setHideElements] = useState(true) 
    
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
                    if (el.statePatient === "Критическое") {
                        if (badPatients) {

                            setBadPatients([...badPatients, el])
                            const myNewArray = Object.assign([...patients], {
                                [index]: {
                                    ...patients[index],
                                    statePatient: "Критическое",
                                    check: true
                                }
                            });
                            setPatients(myNewArray);

                        } else {
                            setBadPatients([el])
                            const myNewArray = Object.assign([...patients], {
                                [index]: {
                                    ...patients[index],
                                    statePatient: "Критическое",
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

        if (badPatients.length == 0) {
            setHideElements(false)
            console.log("Закончились элементы")
        }


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

      const removePatientList = (index) => {
        setPatients([
            ...patients.slice(0, index),
            ...patients.slice(index + 1)
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
        if (patientState === "Критическое") {
            return (
                <span style={{color: "red", fontWeight: "bolder"}}>Критическое состояние</span>
            ) 
        } if (patientState === "Удовлетворительное") {
            return (
                <span style={{color: "green", fontWeight: "bolder"}}>Удовлетворительное состояние</span>
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
            let statePatient = "Удовлетворительное"
    
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
    
    
            if (ball === 1) {statePatient = "Удовлетворительное"}
            else if (ball === 2) {statePatient = "Среднее"}
            else if (ball >= 3) {
                statePatient = "Критическое"
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

    function collapseAll() {
        console.log("Нажато")
        setHideElements(false)
    }

    function getBadPatientElements() {
        return (
            <>
                {badPatients.map((el, index) => (
                    <>
                        {/* {startAudio()} */}
                        
                        
                        
                        <div className="card" key={String(index) + "1"}>
                            <h2>{el.first_name} {el.last_name}</h2>
                            <ul style={{textAlign: "left"}}>
                                <li><p>Состояние: {el.statePatient}</p></li>
                                <li><p>Отделение: {el.branch}</p></li>
                                <li><p>Палата: {el.chamber}</p></li>
                            </ul>
                            <div className="buttons">
                                <Link to={"patient/" + el.id}>
                                    <button className="_1">
                                            Подробнее
                                    </button>
                                </Link>
                                <button className="_2" onClick={() => onCloseWindowPatient(index)}>
                                    Закрыть
                                </button>
                            </div>
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
                    {hideElements ? 
                    <div className="index_container_wrapper">
                        <div className="text_field">
                            <h1>Пациентам которым <span>ПЛОХО</span></h1>

                            <p onClick={collapseAll}>Свернуть список больных пациентов</p>
                        
                        
                        </div>
                        <p className="collapse"></p>
                        <div className="index_container1">
                            {patients ? getBadPatientElements() : undefined}
                        </div>
                    </div>
                    : null}
                </>
            : undefined}


            <div className="flex_container_center" >
                <div className="index_container">
                    <div className="grade">
                        <div className="title">
                            <h1>Список <span>Пациентов</span></h1>
                        </div>
                        <div className="cards">
                            {/* <div className="card" style={{backgroundColor: "#0b0b11", borderRadius: "0px"}}>
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
                            </div> */}
                            {patients ? getElements() : <h1 style={{marginLeft: "4vh"}}>Пусто</h1>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Index;
