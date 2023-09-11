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
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ErrorIcon from '@mui/icons-material/Error';
import HeaderToolbar from '../Toolbar/HeaderToolbar';
import Buttons from '../Buttons/Buttons';

interface DataItem {
  _id: string;
  name: string;
  description?: string;
  is_active: boolean;
  applicationId: string;
}

interface PaginationResponse {
  data: DataItem[];
  pagination: {
    totalPages: number;
    pageSize: number;
    currentPage: number;
    totalCount: number;
  };
}

interface DataGridProps {
  title: string;
  fetchData: (page: number) => Promise<PaginationResponse>;
  //   renderItem: (item: DataItem) => React.ReactNode;
}

const DataGrid: React.FC<DataGridProps> = ({
  title,
  fetchData,
  //   renderItem,
}) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { data, error, isLoading } = useQuery<DataItem[], Error>({
    queryKey: [`${title}`, page],
    queryFn: () => fetchData(page),
    keepPreviousData: true,
  });

  useEffect(() => {
    if (data?.pagination) {
      setTotalPages(data.pagination.totalPages);
    }
  }, [data]);

  return (
    <>
      <HeaderToolbar title={title.toUpperCase()} />
      <Container style={{ marginTop: '20px' }}>
        <Grid container spacing={2}>
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Grid item xs={6} key={index}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                  <Skeleton animation='wave' variant='text' width='60%' />
                  <Skeleton animation='wave' variant='text' width='80%' />
                </Paper>
              </Grid>
            ))
          ) : error ? (
            <Alert
              iconMapping={{
                error: <ErrorIcon fontSize='large' />,
              }}
              severity='error'
              variant='outlined'
              sx={{ marginTop: '20px' }}
            >
              <AlertTitle>Error</AlertTitle>
              Unable to Fetch {title}
              <strong> {error.message}</strong>
            </Alert>
          ) : (
            data?.[title]?.map((item) => (
              <Grow in={true} timeout={1000} key={item._id}>
                <Grid item xs={6}>
                  <Paper elevation={16} style={{ padding: '20px' }}>
                    <Grid container spacing={6}>
                      <Grid item xs={12} md={8}>
                        <Typography variant='h6'>{item.name}</Typography>
                        <Typography variant='body2'>
                          {item.description}
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
            ))
          )}
          <Grid
            xs={12}
            item
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
};

export default DataGrid;
