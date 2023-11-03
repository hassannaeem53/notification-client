import { ButtonGroup, CircularProgress, Grid, IconButton } from '@mui/material';
import useData from '../hooks/useData';

interface App {
  _id: string;
  name: string;
  description?: string;
  is_active: boolean;
}

const Event = () => {
  const {
    data: responseData,
    isLoading,
    error,
  } = useData<{ events: App[] }>('/events', {
    params: {
      page: 2,
    },
  });

  if (isLoading) return <CircularProgress className='mx-auto' />;

  const events = responseData?.events || [];

  return (
    <>
      {error && <p>Error: {error.message}</p>}
      {events.map((app, index) => (
        <Grid item xs={12} md={3} style={{ display: 'flex' }} key={app._id}>
          <Tile appName={app.name} appDescription={app.description} />
        </Grid>
      ))}
      <Grid
        item
        xs={12}
        justifyContent='flex-end'
        sx={{
          textAlign: 'center',
        }}
      ></Grid>
    </>
  );
};

export default Event;
