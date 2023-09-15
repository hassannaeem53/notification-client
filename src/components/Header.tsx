import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CompanyLogo from '../assets/icon.svg';
import { Divider } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position='static' sx={{ backgroundColor: '#032a9c' }}>
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Use the imported SVG logo */}
          <Link to='/'>
            <img
              src={CompanyLogo}
              alt='Company Logo'
              style={{ width: '70px', marginRight: '10px' }}
            />
          </Link>
          <Divider
            orientation='vertical'
            flexItem
            sx={{
              background: 'white',
              height: '50px',
              marginRight: '10px',
              marginTop: '10px',
              border: '1px solid white',
            }} // Adjust styling here
          />
          <Link to='/'>
            <Typography variant='h5' component='div'>
              <span style={{ color: 'white', textDecoration: 'none' }}>
                Notify
              </span>
            </Typography>
          </Link>
          <NotificationsIcon style={{ color: 'orange', marginTop: '-15px' }} />
        </div>
        {/* You can add any additional AppBar components here */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
