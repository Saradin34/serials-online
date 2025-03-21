import React from 'react';
import './Header.scss';
import background from '../../assets/image/headlogonew.webp'

const Header: React.FC = () => {
    return (
        <div className='header'>
            <img className='header_image' src={background} alt="header image"/>
        </div>
    );
};

export default Header;