import SidebarLeft from "../../components/SidebarLeft/SidebarLeft.tsx";
import MainContent from "../../components/MainContent/MainContent.tsx";
import SidebarRight from "../../components/SidebarRight/SidebarRight.tsx";
import './Home.scss';

const Home = () => {
    return (
        <div className='home-container'>
            <SidebarLeft />
            <MainContent />
            <SidebarRight />
        </div>
    );
};

export default Home;