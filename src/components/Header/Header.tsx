import React from 'react';
import './Header.scss';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">Anime Site</Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;