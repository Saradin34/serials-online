import React from 'react';
import './SidebarRight.scss';

const SidebarRight: React.FC = () => {
    return (
        <aside className="sidebar-right">
            <div className="auth">
                <button className="auth-button">Войти</button>
                <button className="auth-button">Регистрация</button>
            </div>
        </aside>
    );
};

export default SidebarRight;