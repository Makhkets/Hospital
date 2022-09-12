import { Link } from "react-router-dom";
import "../../css/sign.css"

const Cap = () => {
    return (
        <>
            <div className="cap__wrapper">
                <div className="cap">
                    <div className="container-4">
                        <input type="search" id="search" placeholder="Search..." />
                        <button className="icon"><i className="fa fa-search"></i></button>
                    </div>
                </div>
                <div className="nav">
                    <nav>
                        <ul>
                            <li><Link to="/signup">Регистрация</Link></li>
                            <li><Link to="/signin">Авторизация</Link></li>
                            <li><ion-icon name="notifications-outline" style={{fontSize: "30px", color: "rgb(68, 76, 226)", cursor: "pointer"}}></ion-icon></li>
                            <li><ion-icon name="bookmark-outline" style={{fontSize: "30px", color: "rgb(68, 76, 226)", cursor: "pointer"}}></ion-icon></li>
                            <li>
                                <div className="nav__img">
                                    <img src="https://www.khl.ru/images/players/3694.jpg" alt="" />
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Cap;