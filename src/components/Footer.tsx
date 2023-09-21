import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const footerStyle = {
  backgroundColor: '#032a9c',
  color: 'white',
  padding: '16px 0',
};

const iconStyle = {
  marginRight: '8px',
  fontSize: '30px',
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '16px',
};

const contentStyle = {
  flex: 1,
};

const Footer = () => {
  return (
    <div style={containerStyle}>
      <div style={contentStyle}></div>
      <footer style={footerStyle}>
        <Container maxWidth='lg'>
          <Grid container spacing={2} alignItems='center'>
            <Grid item xs={6} sm={6}>
              <Typography variant='body1'>© 2023 GoSaas Inc</Typography>
            </Grid>
            <Grid item xs={6} sm={6}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <FacebookIcon style={iconStyle} />
                <TwitterIcon style={iconStyle} />
                <LinkedInIcon style={iconStyle} />
              </div>
            </Grid>
          </Grid>
        </Container>
      </footer>
    </div>
  );
};

export default Footer;
