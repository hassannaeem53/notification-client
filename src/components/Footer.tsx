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
  //   minHeight: '100vh', // Set container height to 100% of viewport height
  display: 'flex',
  flexDirection: 'column', // Arrange children in a column
  marginTop: '16px', // Push footer to the bottom of the page
};

const contentStyle = {
  flex: 1, // Allow content to grow and push footer down
};

const Footer = () => {
  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {/* Your page content goes here */}
        {/* Adjust content height as needed */}
      </div>
      <footer style={footerStyle}>
        <Container maxWidth='lg'>
          <Grid container spacing={2} alignItems='center'>
            <Grid item xs={12} sm={6}>
              <Typography variant='body1'>© 2023 GoSaas Inc</Typography>
            </Grid>
            <Grid item xs={12} sm={6} container justifyContent='flex-end'>
              <FacebookIcon style={iconStyle} />
              <TwitterIcon style={iconStyle} />
              <LinkedInIcon style={iconStyle} />
            </Grid>
          </Grid>
        </Container>
      </footer>
    </div>
  );
};

export default Footer;
