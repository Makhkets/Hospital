import { useState } from "react";
import getStatistic from "../actions/get_statistic";

const Information = () => {
    const [statistic, setStatistic] = useState(0)

    function returnStatistic() {
        if (statistic === 0) {
            const getStat = async () => {
                const data = await getStatistic()
                setStatistic(data)
                console.log("dsdsds")
                    return (
                        <>
                            <li>Всего врачей: <span style={{color: "rgb(116, 141, 255)", fontWeight: "bolder"}}>15</span></li>
                            <li>Всего пациентов: <span style={{color: "rgb(116, 141, 255)", fontWeight: "bolder"}}>5</span></li>
                            <li>Пациентов в Терапии: <span style={{color: "rgb(116, 141, 255)", fontWeight: "bolder"}}>2</span></li>
                            <li>Пациентов в Кардиологии: <span style={{color: "rgb(116, 141, 255)", fontWeight: "bolder"}}>7</span></li>
                            <li>Пациентов в Нервология: <span style={{color: "rgb(116, 141, 255)", fontWeight: "bolder"}}>2</span></li>
                            <li>Пациентов в Хирургии: <span style={{color: "rgb(116, 141, 255)", fontWeight: "bolder"}}>9</span></li>
                            <li>Пациентов в Эндокринологии: <span style={{color: "rgb(116, 141, 255)", fontWeight: "bolder"}}>6</span></li>
                        </>
                    )
              }
              getStat()
        }
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