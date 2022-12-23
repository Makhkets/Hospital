import { useEffect } from "react";
import { useState } from "react";
import getStatistic from "../actions/get_statistic";

const Information = () => {
    const [info, setInfo] = useState(0)
    
    useEffect(() => {
        (async () => {
            const data = await getStatistic()
            setInfo(data)
        })()
    }, [])

    function returnStatistic() {
        return (
            <>
                <div>
                    <p className="main">Всего врачей:</p>
                    <p className="second">{info.doctors}</p>
                </div>
                <div>
                    <p className="main">Всего пациентов:</p>
                    <p className="second">{info.patients}</p>
                </div>
                <div>
                    <p className="main">Всего отчетов:</p>
                    <p className="second">{info.actions}</p>
                </div>
                <div>
                    <p className="main">Пациентов в Терапии:</p>
                    <p className="second">{info.therapy}</p>
                </div>
                <div>
                    <p className="main">Пациентов в Кардиологии:</p>
                    <p className="second">{info.cardiology}</p>
                </div>
                <div>
                    <p className="main">Пациентов в Нервология:</p>
                    <p className="second">{info.neurology}</p>
                </div>
                <div>
                    <p className="main">Пациентов в Хирургии:</p>
                    <p className="second">{info.surgical}</p>
                </div>
                <div>
                    <p className="main">Пациентов в Эндокринологии:</p>
                    <p className="second">{info.endocrinology}</p>
                </div>
            </>
        )
    }

    return (
        <div style={{width: "100%"}}>
            <div className="info_page_main">

                <div className="title">
                    <h1>Информация</h1>
                    <p>Государственное бюджетное учреждение «Клиническая больница №4 г. Грозного».</p>
                </div>
                <div className="information_container">

                    <div className="map">
                        <div>
                            <a className="first" href="https://yandex.ru/maps/org/klinicheskaya_bolnitsa_1_imeni_u_i_khanbiyeva/1021194958/?utm_medium=mapframe&utm_source=maps">Клиническая больница № 1 имени У. И. Ханбиева</a>
                            <a className="second" href="https://yandex.ru/maps/1106/grozniy/category/hospital/184105956/?utm_medium=mapframe&utm_source=maps">Больница для взрослых в Грозном</a>
                            <iframe className="frame" src="https://yandex.ru/map-widget/v1/-/CCUbiYc0OA"></iframe>
                        </div>
                    </div>
                </div>

                <div className="statistics">
                    <div className="contacts">
                        <h1>Контакты:</h1>
                        <div>

                        <div>
                                <p className="main">Адрес</p>
                                <p className="second">364001; Чеченская Республика, г.Грозный, ул. Социалистическая, 4</p>
                            </div>
                            <div>
                                <p className="main">Справочная COVID-центра:</p>
                                <p className="second">8 (938) 892-85-86</p>
                            </div>
                            <div>
                                <p className="main">Телефон регистратуры:</p>
                                <p className="second">8 (8712) 22-42-17</p>
                            </div>
                            <div>
                                <p className="main">Call-центр:</p>
                                <p className="second">8 (928) 943-17-39</p>
                            </div>
                            <div>
                                <p className="main">Единый телефонный номер по коронавирусу:</p>
                                <p className="second">122</p>
                            </div>
                            <div>
                                <p className="main">Адрес электронной почты:</p>
                                <p className="second">4gkb@bk.ru</p>
                            </div>
                            <div>
                                <p className="main">Часы работы</p>
                                <p className="second">ежедневно, 09:00–18:00</p>
                            </div>
                            <div>
                                <p className="main">Номер телефона глав. Врача</p>
                                <p className="second">+7 (938) 895 42-50</p>
                            </div>
                        </div>
                    </div>
                    <div className="contacts">
                        <h1>Статистика:</h1>
                        <div>
                           {returnStatistic()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Information