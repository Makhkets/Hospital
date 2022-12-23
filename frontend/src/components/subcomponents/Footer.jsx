import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div className="footer">
                <div className="column">
                    <p className="footer_text"><a href="https://t.me/ENCODEE" target="_blank">Сотрудничество</a></p>
                    <p className="footer_text"><a href="https://t.me/IMPULSEE_BOT" target="_blank">Telegram Bot</a></p>
                    <p className="footer_text"><a href="https://t.me/impulsee_chat" target="_blank">Telegram Chat</a></p>
                </div>
                <div className="column">
                    <p className="footer_text"><Link to="/profile">Отделения</Link></p>
                    <p className="footer_text"><Link to="/" >Пациенты</Link></p>
                    <p className="footer_text"><Link to="/personal" >Врачи</Link></p>
                </div>
                <div className="column">
                    <p className="footer_text"><a href="https://github.com/Benefixx/Hospital/blob/main/LICENSE.md" target="_blank">Лицензия</a></p>
                    <p className="footer_text"><a href="https://www.apache.org/licenses/LICENSE-2.0" target="_blank">Справка</a></p>
                    <p className="footer_text"><a href="https://github.com/Benefixx/Hospital" target="_blank">Репозиторий</a></p>
                </div>
            </div>
            <br />
            <br />
        </footer>
    );
};

export default Footer;