import { Link } from "react-router-dom";

const Branch = () => {
    return (
        <div>
            <div className="branch_container">
                <div className="branches">
                    
                    <div className="branch" >
                        <h1 style={{color: "var(--loginSubmitBackgroundColor)"}}>Эндокринология</h1>
                        <p>Эндокриноло́гия — наука о строении и функции желёз внутренней секреции, вырабатываемых ими продуктах, о путях их образования и действия на организм животных и человека; а также о заболеваниях, вызванных нарушением функции этих желёз или действиями этих гормонов.</p>
                        <Link to="/branch/endocrinology"><button className="button_primary">Перейти в отделение</button></Link>
                    </div>

                    <div className="branch" >
                        <h1 style={{color: "var(--loginSubmitBackgroundColor)"}}>Терапия</h1>
                        <p> процесс, целью которого является устранение заболевания или травмы, патологического состояния или иного нарушения жизнедеятельности, нормализация нарушенных процессов жизнедеятельности, восстановление и улучшение здоровья.</p>
                        <Link to="/branch/therapy"><button className="button_primary">Перейти в отделение</button></Link>
                    </div>
                    <div className="branch" >
                        <h1 style={{color: "var(--loginSubmitBackgroundColor)"}}>Кардиология</h1>
                        <p>Кардиоло́гия — обширный раздел медицины, занимающийся изучением сердечно-сосудистой системы человека: строения и развития сердца и сосудов, их функций, а также заболеваний, включая изучение причин их возникновения, механизмов развития, клинических проявлений, вопросов диагностики, а также разработку эффективных методов</p>
                        <Link to="/branch/cardiology"><button className="button_primary">Перейти в отделение</button></Link>
                    </div>

                    <div className="branch" >
                        <h1 style={{color: "var(--loginSubmitBackgroundColor)"}}>Неврология</h1>
                        <p>группа медико-биологических научных дисциплин, которая изучает нервную систему как в норме, так и в патологии[1]. Занимается вопросами возникновения заболеваний центральной и периферической частей нервной системы, а также изучает механизмы их развития, симптоматику и возможные способы диагностики, лечения и профилактики[2].</p>
                        <Link to="/branch/neurology"><button className="button_primary">Перейти в отделение</button></Link>
                    </div>  
    
                      <div className="branch">
                        <h1 style={{color: "var(--loginSubmitBackgroundColor)"}}>Хирургическая</h1>
                        <p>область медицины, изучающая острые и хронические заболевания, которые лечат при помощи оперативного (хирургического) метода[1].</p>
                        <Link to="/branch/surgical"><button className="button_primary">Перейти в отделение</button></Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Branch;