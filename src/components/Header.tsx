// src/components/Header.tsx

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Header = () => {
  return (
    <>
      <AppBar position='static' style={{ backgroundColor: 'blue' }}>
        <Toolbar>
          <Typography variant='h5' component='div' sx={{ flexGrow: 1 }}>
            Notify
            <NotificationsIcon />
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
