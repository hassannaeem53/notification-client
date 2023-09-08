import React, { useState } from 'react';
import { Grid, Paper, Typography, Container, Pagination } from '@mui/material';
import Buttons from '../common/Buttons/Buttons';

const itemsPerPage = 2; // Number of items to show per page

const TempEvent = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: 'Event 1',
      description: 'Description 1',
      isActive: true,
    },
    {
      id: 2,
      name: 'Event 2',
      description: 'Description 2',
      isActive: false,
    },
    {
      id: 3,
      name: 'Event 3',
      description: 'Description 3',
      isActive: true,
    },
    {
      id: 4,
      name: 'Event 4',
      description: 'Description 4',
      isActive: true,
    },
    // Add more events as needed
  ]);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Calculate the start and end indices based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedEvents = events.slice(startIndex, endIndex);

  const handleEdit = (eventId) => {
    // Implement edit logic here
    console.log(`Edit event with ID: ${eventId}`);
  };

  const handleDelete = (eventId) => {
    // Implement delete logic here
    console.log(`Delete event with ID: ${eventId}`);
  };

  const handleToggle = (eventId) => {
    // Implement toggle logic here
    console.log(`Toggle event with ID: ${eventId}`);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        {displayedEvents.map((event) => (
          <Grid item xs={6} key={event.id}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Grid container spacing={6}>
                <Grid item xs={12} md={8}>
                  <Typography variant='h6'>{event.name}</Typography>
                  <Typography variant='body2'>{event.description}</Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <Buttons />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={Math.ceil(events.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        variant='outlined'
        shape='rounded'
        color='primary'
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />
    </Container>
  );
};

export default TempEvent;
