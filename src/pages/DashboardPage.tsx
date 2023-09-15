import React, { useEffect } from 'react';
import { Alert, Grid } from '@mui/material';
import Application from '../containers/Application';
import DataGrid from '../common/DataGrid/DataGrid'; // Import the DataGrid component
import axios from 'axios';

const Dashboard = () => {
  // Function to fetch events data
  const [applicationId, setApplicationId] = React.useState<string>(''); // Add the applicationId state variable
  const [applicationName, setApplicationName] = React.useState<string>(''); // Add the applicationName state variable
  const [eventId, setEventId] = React.useState<string>(''); // Add the eventId state variable
  const [eventName, setEventName] = React.useState<string>(''); // Add the eventName state variable

  useEffect(() => {
    if (applicationId) {
      setEventId('');
      setEventName('');
    }
  }, [applicationId]);

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
    <Grid container spacing={2} sx={{ padding: 1, minHeight: '100vh' }}>
      <Grid item sm={12}>
        <Application
          onSet={(id) => setApplicationId(id)}
          onSetName={setApplicationName}
        />
      </Grid>

      {applicationId ? (
        <>
          <Grid item sm={12}>
            {/* Render the DataGrid for Events */}
            <DataGrid
              title='events'
              fetchData={fetchEvents}
              parentId={applicationId}
              parentName={applicationName}
              onSet={(id) => setEventId(id)}
              setEventName={setEventName}
            />
          </Grid>
          {eventId ? (
            <Grid item sm={12}>
              <DataGrid
                title='notifications'
                fetchData={fetchNotifications}
                parentId={eventId}
                parentName={eventName}
              />
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Alert
                severity='info'
                sx={{ marginTop: '20px', fontSize: '1.2rem' }}
              >
                Please select an Event to view Notifications.
              </Alert>
            </Grid>
          )}
        </>
      ) : (
        // Render a message or component when applicationId is not set
        <Grid item xs={12}>
          <Alert severity='info' sx={{ marginTop: '20px', fontSize: '1.2rem' }}>
            Please select an Application to view Events.
          </Alert>
        </Grid>
      )}
    </Grid>
  );
};

export default Dashboard;
