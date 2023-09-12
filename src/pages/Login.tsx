import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  Divider,
} from '@mui/material';
import CompanyLogo from '../assets/Company-logo.png';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here, e.g., send a request to your authentication endpoint
    console.log('Form Data:', formData);
  };

  return (
    <Container
      maxWidth='sm'
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper elevation={6} style={{ padding: '20px', width: '100%' }}>
        <Grid container spacing={2} justifyContent='center' alignItems='center'>
          <Grid item xs={12} align='center'>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                variant='h4'
                component='div'
                sx={{
                  fontWeight: '400',
                  marginRight: '40px',
                  marginLeft: '60px',
                  font: 'Poppins',
                  fontSize: '40px',

                  color: '#032a9c',
                }}
                //color='primary'
              >
                Notify
                <NotificationsIcon
                  style={{ color: 'orange', height: 'auto', width: '40px' }}
                />
              </Typography>
              <Divider
                orientation='vertical'
                variant='middle'
                flexItem
                sx={{ height: '100px' }} // Adjust the height as needed
              />
              <img
                src={CompanyLogo}
                alt=''
                width={'120px'}
                style={{ marginLeft: '40px' }}
              />
            </div>
          </Grid>

          <Grid item xs={12} align='center'>
            <Typography variant='h4' gutterBottom>
              Login
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
              <TextField
                label='Email'
                fullWidth
                margin='normal'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
              />
              <TextField
                label='Password'
                fullWidth
                margin='normal'
                name='password'
                type='password'
                value={formData.password}
                onChange={handleChange}
                required
              />
              {formData.password.length < 8 && (
                <Typography variant='subtitle1' color='error'>
                  Password must be at least 8 characters long
                </Typography>
              )}
              <Button
                type='submit'
                variant='contained'
                style={{
                  marginTop: '20px',
                  marginBottom: '20px',
                  backgroundColor: '#032a9c',
                  transition: 'background-color 0.3s', // Add transition for smooth hover effect
                }}
                endIcon={<LockOutlinedIcon />}
                fullWidth
                // Define hover styles
                sx={{
                  '&:hover': {
                    backgroundColor: '#2351d1', // Change background color on hover
                  },
                }}
              >
                Login
              </Button>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Login;