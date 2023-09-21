import React, { useEffect, useState } from 'react';
import { Alert, Grid } from '@mui/material';
import Application from '../containers/Application';
import DataGrid from '../common/DataGrid/DataGrid'; // Import the DataGrid component
import apiClient from '../services/apiClient';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useSessionStorage } from 'usehooks-ts';

const Dashboard = () => {
  const { state } = useLocation();
  // Add an event listener to the 'beforeunload' event
  window.onbeforeunload = function () {
    // Clear the session storage
    window.sessionStorage.clear();
  };

  // Function to fetch events data
  const [applicationId, setApplicationId] = useSessionStorage<string>(
    'redirectApplicationId',
    ''
  ); // Add the applicationId state variable

  const [applicationName, setApplicationName] = useState<string>(''); // Add the applicationName state variable
  const [eventId, setEventId] = useSessionStorage('redirectEventId', ''); // Add the eventId state variable
  const [eventName, setEventName] = useState<string>(''); // Add the eventName state variable
  const [eventDataAvailable, setEventDataAvailable] = useState<boolean>(false);

  useEffect(() => {
    if (applicationId && !state?.redirectEventId) {
      setEventId('');
      setEventName('');
    }
  }, [applicationId]);

  const fetchEvents = async (page: number) => {
    const queryParams = {
      applicationId: applicationId,
      page: page, // Use the page state variable here
    };

    return apiClient
      .get('/events', {
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

    return apiClient
      .get('/notifications', {
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
          applicationId={applicationId}
        />
      </Grid>

      {applicationId ? (
        <>
          <Grid item sm={12}>
            {/* Render the DataGrid for Events */}
            <DataGrid
              title='events'
              parentId={applicationId}
              parentName={applicationName}
              onSet={(id) => setEventId(id)}
              setEventName={setEventName}
              setEventId={setEventId}
              applicationId={applicationId}
              eventId={eventId}
              setEventDataAvailable={setEventDataAvailable}
            />
          </Grid>
          {eventId ? (
            <>
              <Grid item sm={12}>
                <DataGrid
                  title='notifications'
                  parentId={eventId}
                  parentName={eventName}
                  applicationId={applicationId}
                  eventId={eventId}
                />
              </Grid>
            </>
          ) : (
            eventDataAvailable && (
              <Grid item xs={12}>
                <Alert
                  severity='info'
                  sx={{ marginTop: '20px', fontSize: '1.2rem' }}
                >
                  Please select an Event to view Notifications.
                </Alert>
              </Grid>
            )
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
