import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { findServices } from "../actions/get_services";

const Personal = () => {
    const [services, setServices] = useState(false)

    useEffect(() => {
        (async () => {
            const data = await findServices()
            setServices(data)
        })()
    }, []);

    return (
        <>
            <div className="personal_container">
                <div className="container">
                    

                    {services ? 
                        services.map((el, index) => (
                            <div className="card">
                                <img src={el.user.photo} alt="" />
                                <div className="block">
                                    <div className="info">
                                        <p className="fio">{el.user.first_name} {el.user.last_name}</p>
                                        <p className="desc">{el.desc}</p>
                                        <p className="price">Цена: {el.price} Рублей</p>
                                        <div className="buttons">
                                            <a href={"https://wa.me/+" + el.whatsapp} target="_blank"><button className="w">Whatsapp</button></a>
                                            <a href={"https://t.me/" + el.telegram} target="_blank"><button className="t">Telegram</button></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    : "пусто"}

                    {/* <div className="card">
                        <img src="https://www.khl.ru/images/players/3694.jpg" alt="" />
                        <div className="block">
                            <div className="info">
                                <p className="fio">Алиев Рахим</p>
                                <p className="desc">Старший врач отделения неврология, оконченное высшее образование</p>
                                <p className="price">Цена: 1000 - 2500 Рублей</p>
                                <div className="buttons">
                                    <button className="w">Whatsapp</button>
                                    <button className="t">Telegram</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <img src="https://media.istockphoto.com/id/175399910/ru/%D1%84%D0%BE%D1%82%D0%BE/%D1%83%D0%B2%D0%B5%D1%80%D0%B5%D0%BD%D0%BD%D0%BE-%D0%B0%D1%84%D1%80%D0%B8%D0%BA%D0%B0%D0%BD%D1%81%D0%BA%D0%B8%D1%85-%D0%B0%D0%BC%D0%B5%D1%80%D0%B8%D0%BA%D0%B0%D0%BD%D1%81%D0%BA%D0%B8%D0%B9-%D0%B6%D0%B5%D0%BD%D1%81%D0%BA%D0%B8%D0%B9-%D0%B4%D0%BE%D0%BA%D1%82%D0%BE%D1%80-%D0%B8%D0%B7%D0%BE%D0%BB%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D0%B5.jpg?s=170667a&w=0&k=20&c=EvQnj6Lt9X2mq7Digjm7g9oEm9a4gzVKnvHob69oVIc=" alt="" />
                        <div className="block">
                            <div className="info">
                                <p className="fio">Алиев Рахим</p>
                                <p className="desc">Старший врач отделения неврология, оконченное высшее образование</p>
                                <p className="price">Цена: 1000 - 2500 Рублей</p>
                                <div className="buttons">
                                    <button className="w">Whatsapp</button>
                                    <button className="t">Telegram</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <img src="https://img.freepik.com/free-photo/portrait-of-a-hansome-young-male-doctor-man_171337-5068.jpg?w=1500" alt="" />
                        <div className="block">
                            <div className="info">
                                <p className="fio">Алиев Рахим</p>
                                <p className="desc">Старший врач отделения неврология, оконченное высшее образование</p>
                                <p className="price">Цена: 1000 - 2500 Рублей</p>
                                <div className="buttons">
                                    <button className="w">Whatsapp</button>
                                    <button className="t">Telegram</button>
                                </div>
                            </div>
                        </div>
                    </div>
                     */}


                </div>
            </div>
        </>
    );
};

export default Personal;