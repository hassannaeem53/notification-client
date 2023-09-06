import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Header = () => {
  return (
    <>
      <AppBar position='static' style={{ backgroundColor: '#032a9c' }}>
        <Toolbar>
          <Typography variant='h5' component='div' sx={{ flexGrow: 1 }}>
            Notify
            <NotificationsIcon style={{ color: 'orange' }} />
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
