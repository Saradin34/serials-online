import React from 'react';
import { Link } from 'react-router-dom';
import './SidebarLeft.scss';

const SidebarLeft: React.FC = () => {
    return (
        <aside className="sidebar-left">
            <nav className="menu">
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
        </aside>
    );
};

export default SidebarLeft;