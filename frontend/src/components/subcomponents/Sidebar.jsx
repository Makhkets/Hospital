import { Link } from "react-router-dom";

const Sidebar = (props) => {
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
                            <div className="teacher">
                                <img src="https://media.istockphoto.com/photos/female-teacher-pointing-with-finger-at-mathematical-equation-on-in-picture-id1080232656?k=20&m=1080232656&s=612x612&w=0&h=7OszmnpcTXIiIhqUXUL3sOaI-nn9DisJU8z3ceeHL5k=" alt="" />
                                <p>Павел Александров <span>Аллерголог Венеролог</span></p>
                            </div>
                            <div className="teacher">
                                <img src="https://media.istockphoto.com/photos/female-teacher-pointing-with-finger-at-mathematical-equation-on-in-picture-id1080232656?k=20&m=1080232656&s=612x612&w=0&h=7OszmnpcTXIiIhqUXUL3sOaI-nn9DisJU8z3ceeHL5k=" alt="" />
                                <p>Павел Александров <span>Аллерголог Венеролог</span></p>
                            </div>
                            <div className="teacher">
                                <img src="https://media.istockphoto.com/photos/female-teacher-pointing-with-finger-at-mathematical-equation-on-in-picture-id1080232656?k=20&m=1080232656&s=612x612&w=0&h=7OszmnpcTXIiIhqUXUL3sOaI-nn9DisJU8z3ceeHL5k=" alt="" />
                                <p>Павел Александров <span>Аллерголог Венеролог</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="explore">
                        <h1>EXPLORE ALL</h1>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;