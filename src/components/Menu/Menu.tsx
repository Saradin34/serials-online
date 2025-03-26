import {Link} from "react-router-dom";
import {FC} from "react";
import './Menu.scss';

const Menu: FC = () => {
    return (
        <nav className="menu">
            <h3 className="menu-title">Меню</h3>
            <ul>
                <li><Link to="/">Главная</Link></li>
                <li><Link to="/best">Лучшее</Link></li>
                <li><Link to="/series">Сериалы</Link></li>
                <li><Link to="/ova">OVA</Link></li>
                <li><Link to="/japan">Япония</Link></li>
                <li><Link to="/china">Китай</Link></li>
                <li><Link to="/announcements">Анонсы</Link></li>
                <li><Link to="/schedule">Расписание</Link></li>
            </ul>
        </nav>
    );
};

export default Menu;