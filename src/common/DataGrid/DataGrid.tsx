import React, { useState } from 'react';
import {
  AlertTitle,
  Alert,
  Grid,
  Paper,
  Typography,
  Skeleton,
  Grow,
} from '@mui/material';
import { Container } from 'react-bootstrap';
import ErrorIcon from '@mui/icons-material/Error';
import HeaderToolbar from '../Toolbar/HeaderToolbar';
import Buttons from '../Buttons/Buttons';
import useData from '../../hooks/useData';
import PaginationButtons from '../NavButtons';

interface DataItem {
  _id: string;
  name: string;
  description?: string;
  is_active: boolean;
  applicationId: string;
}

export interface PaginationResponse {
  data: DataItem[];
  pagination: {
    totalPages: number;
    pageSize: number;
    currentPage: number;
    totalCount: number;
  };
}

export interface DataGridProps {
  title: string;
  parentId: string;
  onSet?: (id: string) => void;
  parentName?: string;
  setEventName?: (id: string) => void;
}

const DataGrid: React.FC<DataGridProps> = ({
  title,
  parentId,
  parentName,
  onSet,
  setEventName,
}) => {
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string>('');

  const [searchInput, setSearchInput] = useState<string>('');
  const [sort, setSort] = useState<string>('asc');
  const [sortby, setSortby] = useState<string>('name');

  const { data, error, isLoading } = useData(
    page,
    title,
    parentId,
    searchInput,
    sort,
    sortby
  );

  if (error)
    return (
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
    );

  return (
    <>
      <HeaderToolbar
        title={title.toUpperCase()}
        id={parentId}
        onSet={setSearchInput}
        setSort={setSort}
        setSortby={setSortby}
        parentName={parentName}
      />
      <Container
        style={{ marginTop: '20px', paddingLeft: '20px', paddingRight: '20px' }}
      >
        <Grid container spacing={2}>
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <Grid item xs={6} key={index}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                  <Skeleton animation='wave' variant='text' width='60%' />
                  <Skeleton animation='wave' variant='text' width='80%' />
                </Paper>
              </Grid>
            ))
          ) : data?.[title]?.length === 0 ? (
            // No items found error
            <Grid item xs={12}>
              <Alert severity='info' sx={{ marginTop: '20px' }}>
                No Items Found
              </Alert>
            </Grid>
          ) : (
            // Render data items
            data?.[title]?.map((item) => (
              <Grow in={true} timeout={1000} key={item._id}>
                <Grid item xs={6}>
                  <Paper
                    elevation={16}
                    style={{
                      padding: '20px',
                      //backgroundColor: '#EEEEEE',
                      cursor: 'pointer',
                      border:
                        selectedId === item._id && title === 'events'
                          ? '2px solid #2196F3'
                          : '',
                    }}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#CDDEEE',
                        // border: '2px solid #2196F3',
                      },
                    }}
                    onClick={() => {
                      setSelectedId(item._id);
                      setEventName && setEventName(item.name);
                      if (onSet) {
                        onSet(item._id);
                      }
                    }}
                  >
                    <Grid container spacing={6}>
                      <Grid item xs={12} md={8}>
                        <Typography
                          variant='h5'
                          component='div'
                          style={{
                            fontWeight:
                              selectedId === item._id && title == 'events'
                                ? 'bold'
                                : 'normal', // Set the font weight based on the condition
                            fontSize:
                              selectedId === item._id && title == 'events'
                                ? '1.7rem'
                                : '1.5rem', // Set the font size based on the condition
                          }}
                        >
                          {item.name}
                        </Typography>
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
          <PaginationButtons
            currentPage={page}
            totalPages={data?.pagination?.totalPages}
            setPage={setPage}
          />
        </Grid>
      </Container>
    </>
  );
};

export default DataGrid;
