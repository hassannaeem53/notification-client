import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const rootStyle = {
  textAlign: 'center',
  paddingTop: '100px',
};

const headingStyle = {
  fontSize: '4rem',
};

const subheadingStyle = {
  fontSize: '2rem',
  margin: '20px 0',
};

const emojiStyle = {
  fontSize: '3rem',
  marginBottom: '20px',
};

const buttonStyle = {
  backgroundColor: '#032a9c',
  color: 'white',
  fontWeight: 'bold',
  marginTop: '20px',
};

const Page404 = () => {
  return (
    <div style={rootStyle as React.CSSProperties}>
      <Typography variant='h1' style={headingStyle}>
        404
      </Typography>
      <span role='img' aria-label='Confused Emoji' style={emojiStyle}>
        😕
      </span>
      <Typography variant='h2' style={subheadingStyle}>
        Oops! Page not found.
      </Typography>
      <Button variant='contained' style={buttonStyle} href='/'>
        Go back to Home
      </Button>
    </div>
  );
};

export default Page404;
