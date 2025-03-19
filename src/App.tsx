import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import SidebarLeft from './components/SidebarLeft/SidebarLeft';
import SidebarRight from './components/SidebarRight/SidebarRight';
import MainContent from './components/MainContent/MainContent';
import Footer from './components/Footer/Footer';
import './styles/global.scss';

function App() {
  return (
      <Router>
        <Header />
        <div className="app-container">
          <SidebarLeft />
          <MainContent />
          <SidebarRight />
        </div>
        <Footer />
      </Router>
  );
}

export default App;