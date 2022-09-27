import { Link } from "react-router-dom";

const Sidebar = (props) => {
    return (
        <>
            <div className="header">
                <div className="container_wrapper">
                    <div className="elements">
                        <Link to="/"><h1 className="elements__title">HOSPITAL</h1></Link>
                    </div>
                        <div>
                            <div>
                                <nav className="elements__navigations" style={{marginTop: "85px"}}>
                                    <ul>
                                        <div className="icon_text">
                                            <ion-icon name="grid-outline" style={props.choice === "1" ? {color: "#444ce2", fontSize: "30px"} : {color: "white", fontSize: "30px"}}></ion-icon>
                                            <Link to="/"><li style={props.choice === "1" ? {color: "#444ce2"} : {color: "white"}}>Пациенты</li></Link>
                                        </div>

                                        <div className="icon_text">
                                            <ion-icon name="person-outline" style={props.choice === "2" ? {color: "#444ce2", fontSize: "30px"} : {color: "white", fontSize: "30px"}}></ion-icon>
                                            <Link to="/profile"><li style={props.choice === "2" ? {color: "#444ce2"} : {color: "white"}}>Отделения</li></Link>
                                        </div>

                                        <div className="icon_text">
                                            <ion-icon name="add-circle-outline" style={props.choice === "4" ? {color: "#444ce2", fontSize: "30px"} : {color: "white", fontSize: "30px"}}></ion-icon>
                                            <Link to="/add"><li style={props.choice === "4" ? {color: "#444ce2"} : {color: "white"}}>Добавить</li></Link>
                                        </div>
                                        <div className="icon_text">
                                            <ion-icon name="planet-outline" style={props.choice === "3" ? {color: "#444ce2", fontSize: "30px"} : {color: "white", fontSize: "30px"}}></ion-icon>
                                            <Link to="/information"><li style={props.choice === "3" ? {color: "#444ce2"} : {color: "white"}}>Информация</li></Link>
                                        </div>
                                    </ul>
                                </nav>
                            </div>
                            <div className="str"></div>
                            <div>
                                <nav className="elements__navigations">
                                    <ul>
                                    <div className="icon_text">
                                            <ion-icon name="logo-vk" style={{color: "white", fontSize: "30px"}}></ion-icon>
                                            <a href="https://t.me/benefixx" target="_blank"><li>VK</li></a>
                                        </div>
                                        <div className="icon_text">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-telegram" viewBox="0 0 16 16" width="30" height="30">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z" style={{color: "white"}} />
                                            </svg>
                                            <a href="https://t.me/benefixx" target="_blank"><li>Telegram</li></a>
                                        </div>
                                        <div className="icon_text">
                                            <ion-icon name="logo-instagram" style={{color: "white", fontSize: "30px"}}></ion-icon>
                                            <a href="https://t.me/benefixx" target="_blank"><li>Instagram</li></a>
                                        </div>
                                        <div className="icon_text">
                                            <ion-icon name="logo-youtube" style={{color: "white", fontSize: "30px"}}></ion-icon>
                                            <a href="https://t.me/benefixx" target="_blank"><li>Youtube</li></a>
                                        </div>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;