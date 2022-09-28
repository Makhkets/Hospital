import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';

import "../../css/sign.css"

const Cap = (props) => {
    const [findValue, setFindValue] = useState("")
    let navigate = useNavigate()
    
    function find() {
        if (findValue.length === 0) {

        } else {
            setFindValue("")
            window.location.href = `/find/${findValue}`
            navigate(`/find/${findValue}`)
        }
    }
    return (
        <>
            <div className="cap__wrapper">
                <div className="cap">
                    <div className="container-4">
                        <input type="search" id="search" placeholder="Search..." onChange={e => setFindValue(e.target.value)} value={findValue} />
                        <button className="icon" style={{marginBottom: "2.5px"}} onClick={find}><i className="fa fa-search"></i></button>
                        <Link to="/add"><button style={{marginLeft: "3vh", height: "50px"}} className="beautifulButton">Добавить пациента</button></Link>
                    </div>
                </div>


                {props.flag ?  
                <div className="nav">
                    <nav>
                        <ul>
                            <li style={{textTransform: "capitalize"}}><Link to="/profile">{props.user.username}</Link></li>
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
                :
                <div className="nav">
                    <nav>
                        <ul>
                            <li><Link to="/signup">Регистрация</Link></li>
                            <li><Link to="/signin">Авторизация</Link></li>
                            <li><ion-icon name="notifications-outline" style={{fontSize: "30px", color: "rgb(68, 76, 226)", cursor: "pointer"}}></ion-icon></li>
                            <li><ion-icon name="bookmark-outline" style={{fontSize: "30px", color: "rgb(68, 76, 226)", cursor: "pointer"}}></ion-icon></li>
                            <li>
                                <div className="nav__img">
                                    <img src="https://www.meme-arsenal.com/memes/723c78e9be76eba2598c2d4c611f994c.jpg" alt="" />
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>}
            </div>
        </>
    );
};

export default Cap;