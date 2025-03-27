import React from 'react';
import './SidebarLeft.scss';
import Menu from '../Menu/Menu.tsx';
import Search from "../Search/Search.tsx";

const SidebarLeft: React.FC = () => {
    return (
        <aside className="sidebar-left">
            <Menu/>
            <Search/>
        </aside>
    );
};

export default SidebarLeft;