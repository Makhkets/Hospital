import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import { findPersonal } from "../../actions/find_personal";


const Sidebar = (props) => {
    const [personal, setPersonal] = useState(false)

    useEffect(() => {
        (async () => {
            const data = await findPersonal()
            setPersonal(data)
        })()
    }, []);


    return (
        <>
            <div className="sidebar">
                <div className="wrapper">                    
                    <div className="container">
                        <div className="title">
                            <h1><span style={{color: "#38d47c"}}>MEDICAL </span>HELPER</h1>
                        </div>

                        <div className="blocks">
                            <div className="cards">

                                
                                <Link to="/" className={props.choice === "1" ? "card_active" : "card"}>
                                    <ion-icon name="home" style={{fontSize: "30px"}}></ion-icon>
                                    <p>
                                        Главная
                                    </p>
                                </Link>
                                <Link to="/profile/" className={props.choice === "2" ? "card_active" : "card"}>
                                    <ion-icon name="apps" style={{fontSize: "30px"}}></ion-icon>
                                    
                                    <p>
                                        Отделения
                                    </p>
                                </Link>
                                <Link to="/visitors/" className={props.choice === "5" ? "card_active" : "card"}>
                                    <ion-icon name="people" style={{fontSize: "30px"}}></ion-icon>
                                    <p>
                                        Посетители
                                    </p>
                                </Link>
                                <Link to="/add/" className={props.choice === "4" ? "card_active" : "card"}>
                                    <ion-icon name="add-circle" style={{fontSize: "30px"}}></ion-icon>
                                    <p>
                                        Добавить
                                    </p>
                                </Link>
                                <Link to="/information/" className={props.choice === "3" ? "card_active" : "card"}>
                                    <ion-icon name="book" style={{fontSize: "30px"}}></ion-icon>
                                    <p>
                                        Информация
                                    </p>
                                </Link>
                                <a href="https://t.me/ENCODEE" target="_blank"  className={props.choice === "6" ? "card_active" : "card"}>
                                    <ion-icon name="headset" style={{fontSize: "30px"}}></ion-icon>
                                    <p>
                                        Поддержка
                                    </p>
                                </a>
                            </div>
                        </div>
                        {/* №№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№ */}
                        <br />
                        <div className="button">
                        
                            <Link to="/signin/">
                                <p>Войти в систему</p>
                            </Link>
                        
                        </div>
                        {/* №№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№ */}
                        <div className="teacher_title">
                            <p>Врачи</p>
                        </div>
                        <div className="teachers">
                            {personal ? 
                                personal.map((el, index) => (
                                    <div className="teacher" key={index}>
                                        <img src={el.photo} alt="Фото" />
                                        <p>{el.first_name} {el.last_name}   <span>{el.speciality ? el.speciality : "Доктор"}</span></p>
                                    </div>
                                ))
                            : 
                            <p></p>}
                        </div>
                    </div>
                    <div className="explore">
                        <h1><Link to="/personal" style={{color: "#38d47c"}}> EXPLORE ALL</Link></h1>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;