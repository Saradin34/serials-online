import React from 'react';
import './SidebarLeft.scss';
import Menu from '../Menu/Menu.tsx';

const SidebarLeft: React.FC = () => {
    return (
        <aside className="sidebar-left">
            <Menu/>
        </aside>
    );
};

export default SidebarLeft;