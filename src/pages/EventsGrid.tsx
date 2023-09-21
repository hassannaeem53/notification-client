import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {
  AlertTitle,
  Alert,
  Grid,
  IconButton,
  Paper,
  Typography,
  Skeleton,
  Grow,
} from '@mui/material';
import { ButtonGroup, Container } from 'react-bootstrap';
import Buttons from '../common/Buttons/Buttons';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ErrorIcon from '@mui/icons-material/Error'; // Import the Error icon from Material-UI
import HeaderToolbar from '../common/Toolbar/HeaderToolbar';
import apiClient from '../services/apiClient';

interface Event {
  _id: string;
  name: string;
  description?: string;
  is_active: boolean;
  applicationId: string;
}

interface PaginationResponse {
  data: Event[];
  pagination: {
    totalPages: number;
    pageSize: number;
    currentPage: number;
    totalCount: number;
  };
}

const EventsGrid = () => {
  const applicationId = '64df17415dd7e8e52ed734fd'; // Replace with the actual application ID
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Add a state variable for the total number of pages

  const fetchEvents = async (applicationId: string, page: number) => {
    const queryParams = {
      applicationId: applicationId,
      page: page, // Use the page state variable here
    };

    return apiClient
      .get<PaginationResponse>('/events', {
        params: queryParams,
      })
      .then((res) => res.data);
  };

  const {
    data: events,
    error,
    isLoading,
  } = useQuery<Event[], Error>({
    queryKey: ['events', page], // Include the page variable in the query key
    queryFn: () => fetchEvents(applicationId, page), // Pass the page variable here
    keepPreviousData: true,
  });

  useEffect(() => {
    if (events?.pagination) {
      setTotalPages(events.pagination.totalPages);
    }
  }, [events]);

  if (isLoading) {
    // Display skeleton placeholders when data is loading
    const skeletonItems = Array.from({ length: 4 }).map((_, index) => (
      <Grid item xs={3} key={index}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Skeleton animation='wave' variant='text' width='60%' />
          <Skeleton animation='wave' variant='text' width='80%' />
        </Paper>
      </Grid>
    ));

    return (
      <Container>
        <Grid container spacing={2}>
          {skeletonItems}
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Alert
        iconMapping={{
          error: <ErrorIcon fontSize='large' />, // Customize the error icon size
        }}
        severity='error'
        variant='outlined'
        sx={{ marginTop: '20px' }}
      >
        <AlertTitle>Error</AlertTitle>
        Unable to Fetch Events<strong> {error.message}</strong>
      </Alert>
    );
  }

  if (events?.events) {
    return (
      <>
        <HeaderToolbar title='Events' />
        <Container style={{ marginTop: '20px' }}>
          <Grid container spacing={2}>
            {events?.events.map((event) => (
              <Grow in={true} timeout={1000}>
                <Grid item xs={6} key={event._id}>
                  <Paper elevation={16} style={{ padding: '20px' }}>
                    <Grid container spacing={6}>
                      <Grid item xs={12} md={8}>
                        <Typography variant='h6'>{event.name}</Typography>
                        <Typography variant='body2'>
                          {event.description}
                        </Typography>
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
              </Grow>
            ))}
            <Grid
              xs={12}
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '20px',
              }}
            >
              <ButtonGroup>
                <IconButton
                  onClick={() => {
                    if (page > 1) {
                      setPage((prevPage) => prevPage - 1);
                    }
                  }}
                  disabled={page === 1}
                >
                  <ArrowBackIosIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    if (page < totalPages) {
                      setPage((prevPage) => prevPage + 1);
                    }
                  }}
                  disabled={page === totalPages}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
};

export default EventsGrid;
