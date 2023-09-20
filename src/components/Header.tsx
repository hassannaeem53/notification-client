import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CompanyLogo from '../assets/icon.svg';
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  Popover,
  Tooltip,
} from '@mui/material';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    // Typically, this involves clearing authentication tokens or state
    // For example, you might remove the user's token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    handleClosePopover();
    location.reload();

    // Redirect the user to the login page or perform any other necessary actions
    // You can use React Router to navigate to the login page if you're using it
    // Example: history.push('/login');
  };
  const open = Boolean(anchorEl);
  const id = open ? 'user-profile-popover' : undefined;

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
              height: '40px',
              marginRight: '10px',
              marginTop: '20px',
              border: '1px solid',
              opacity: '0.3',
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
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            sx={{ bgcolor: '#2196F3', cursor: 'pointer' }}
            onClick={handleAvatarClick}
          >
            {localStorage.getItem('email')?.charAt(0).toUpperCase()}
          </Avatar>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            sx={{
              '& .MuiPaper-root': {
                width: '200px',
                padding: '16px',
                background: '#EEEEEE',
                color: '#2196F3',
                borderRadius: '8px',
              },
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar
                sx={{
                  bgcolor: '#2196F3',
                  color: 'white',
                  width: '64px',
                  height: '64px',
                  fontSize: '32px',
                }}
              >
                {localStorage.getItem('email')?.charAt(0).toUpperCase()}
              </Avatar>
              <Typography
                variant='h6'
                sx={{ marginTop: '8px', fontWeight: 'bold' }}
              >
                {localStorage.getItem('email')}
              </Typography>
              <Typography variant='body2' sx={{ marginTop: '4px' }}>
                User Type: Admin
              </Typography>
              <Tooltip title='Logout'>
                <Button
                  onClick={handleLogout}
                  sx={{ marginTop: '16px' }}
                  // style={{ backgroundColor: 'white' }}
                  variant='contained'
                >
                  {'Logout '}
                  <IconButton
                    onClick={handleLogout}
                    color='inherit'
                    aria-label='logout'
                    size='small'
                    sx={{ marginLeft: '8px' }}
                  >
                    <LogoutIcon />
                  </IconButton>
                </Button>
              </Tooltip>
            </div>
          </Popover>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
