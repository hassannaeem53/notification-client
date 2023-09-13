import React from 'react';
import { Alert, Grid } from '@mui/material';
import Application from '../containers/Application';
import DataGrid from '../common/DataGrid/DataGrid'; // Import the DataGrid component
import axios from 'axios';
import HeaderToolbar from '../common/Toolbar/HeaderToolbar';

const Dashboard = () => {
  // Function to fetch events data
  const [applicationId, setApplicationId] = React.useState<string>(''); // Add the applicationId state variable
  const [eventId, setEventId] = React.useState<string>(''); // Add the eventId state variable

  const fetchEvents = async (page: number) => {
    const queryParams = {
      applicationId: applicationId,
      page: page, // Use the page state variable here
    };

    return axios
      .get('http://localhost:3000/api/events', {
        params: queryParams,
      })
      .then((res) => res.data);
  };

  // Function to fetch notifications data
  const fetchNotifications = async (page: number) => {
    const queryParams = {
      eventId: eventId,
      page: page, // Use the page state variable here
    };

    return axios
      .get('http://localhost:3000/api/notifications', {
        params: queryParams,
      })
      .then((res) => res.data);
  };

  return (
    <Grid container spacing={3} sx={{ padding: 4 }}>
      <Grid item sm={12}>
        <Application onSet={(id) => setApplicationId(id)} />
      </Grid>

      {applicationId ? (
        <>
          <Grid item sm={12}>
            {/* Render the DataGrid for Events */}
            <DataGrid
              title='events'
              fetchData={fetchEvents}
              parentId={applicationId}
              onSet={(id) => setEventId(id)}
            />
          </Grid>
          {eventId ? (
            <Grid item sm={12}>
              <DataGrid
                title='notifications'
                fetchData={fetchNotifications}
                parentId={eventId}
              />
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Alert severity='info' sx={{ marginTop: '20px' }}>
                Please select an Event to view Notifications.
              </Alert>
            </Grid>
          )}
        </>
      ) : (
        // Render a message or component when applicationId is not set
        <Grid item xs={12}>
          <Alert severity='info' sx={{ marginTop: '20px' }}>
            Please select an Application to view Events.
          </Alert>
        </Grid>
      )}
    </Grid>
  );
};

export default Dashboard;
