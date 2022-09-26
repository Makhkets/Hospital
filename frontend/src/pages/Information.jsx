import { useEffect } from "react";
import { useState } from "react";
import getStatistic from "../actions/get_statistic";

const Information = () => {
    const [info, setInfo] = useState(0)
    
    useEffect(() => {
        (async () => {
            const data = await getStatistic()
            setInfo(data)
            console.log(data)
        })()
    }, [])

    function returnStatistic() {
        console.log("Бесконечный цикл")
        return (
            <>
                <li>Всего врачей: <span style={{color: "rgb(116, 141, 255)", fontWeight: "bolder"}}>{info.doctors}</span></li>
                <li>Всего пациентов: <span style={{color: "rgb(116, 141, 255)", fontWeight: "bolder"}}>{info.patients}</span></li>
                <li>Пациентов в Терапии: <span style={{color: "rgb(116, 141, 255)", fontWeight: "bolder"}}>{info.therapy}</span></li>
                <li>Пациентов в Кардиологии: <span style={{color: "rgb(116, 141, 255)", fontWeight: "bolder"}}>{info.cardiology}</span></li>
                <li>Пациентов в Нервология: <span style={{color: "rgb(116, 141, 255)", fontWeight: "bolder"}}>{info.neurology}</span></li>
                <li>Пациентов в Хирургии: <span style={{color: "rgb(116, 141, 255)", fontWeight: "bolder"}}>{info.surgical}</span></li>
                <li>Пациентов в Эндокринологии: <span style={{color: "rgb(116, 141, 255)", fontWeight: "bolder"}}>{info.endocrinology}</span></li>
            </>
        )
    }

    return (
        <div style={{width: "100%"}}>
            <div className="information_container">
                <div className="evacuation">
                    <h1>План эвакуации</h1>
                    <br />
                    <img src="http://www.p-avtomatika.ru/sites/p-avtomatika.ru/files/plan-evacuacii-mini.jpg" alt="" />
                    <br />
                </div>
                <hr style={{width: "50%", marginLeft: "25%", marginTop: "2%"}} />
                <div className="information_statistic">
                    <h1>Статистика</h1>
                    <ul>
                        {returnStatistic()}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Information