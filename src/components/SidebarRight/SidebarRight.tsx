import {FC} from 'react';
import './SidebarRight.scss';
import Auth from "../Auth/Auth.tsx";

const SidebarRight: FC = () => {


    return (
        <aside className="sidebar-right">
            <Auth/>
        </aside>
    );
};

export default SidebarRight;