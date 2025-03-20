import {BrowserRouter as Router} from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home.tsx';
import './styles/global.scss';

function App() {
    return (
        <Router>
            <div className='wrapper'>
                <Header/>
                <Home/>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;