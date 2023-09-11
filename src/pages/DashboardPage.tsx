import React from 'react';
import { Grid } from '@mui/material';
import Application from '../containers/Application';
import DataGrid from '../common/DataGrid/DataGrid'; // Import the DataGrid component
import axios from 'axios';
import HeaderToolbar from '../common/Toolbar/HeaderToolbar';

const Dashboard = () => {
  // Function to fetch events data
  const applicationId = '64df17415dd7e8e52ed734fd'; // Replace with the actual application ID
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
  const eventId = '64df246d4b72ae713b0ebb0e';
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
        <Application />
      </Grid>
      <Grid item sm={12} alignItems='center'>
        {/* Render the DataGrid for Events */}
        <DataGrid title='events' fetchData={fetchEvents} />
      </Grid>
      <Grid item sm={12}>
        <DataGrid title='notifications' fetchData={fetchNotifications} />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
