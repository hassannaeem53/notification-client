import {
  ButtonGroup,
  CircularProgress,
  Container,
  Grid,
  IconButton,
} from '@mui/material';
import Tile from '../components/Tile';
import useData from '../hooks/useData';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useState } from 'react';
import HeaderToolbar from '../common/Toolbar/HeaderToolbar';

interface App {
  _id: string;
  name: string;
  description?: string;
  is_active: boolean;
}

const Application = () => {
  const [page, setPage] = useState(1);

  const {
    data: responseData,
    isLoading,
    error,
  } = useData<{ applications: App[] }>(
    '/applications',
    {
      params: {
        page: page,
      },
    },
    [page]
  );

  if (isLoading) return <CircularProgress className='mx-auto' />;

  const applications = responseData?.applications || [];

  return (
    <>
      <HeaderToolbar title='Applications' />
      <Container sx={{ marginTop: '20px' }}>
        {error && <p>Error: {error.message}</p>}
        <Grid container spacing={2}>
          {applications.map((app, index) => (
            <Grid item xs={12} md={3} key={app._id}>
              <Tile appName={app.name} appDescription={app.description} />
            </Grid>
          ))}
        </Grid>
        <Grid
          container
          justifyContent='center'
          sx={{
            textAlign: 'center',
            marginTop: '20px',
          }}
        >
          <IconButton onClick={() => setPage(page - 1)}>
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton onClick={() => setPage(page + 1)}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Grid>
      </Container>
    </>
  );
};

export default Application;
