import {
  Alert,
  ButtonGroup,
  CircularProgress,
  Grid,
  IconButton,
  Snackbar,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Tile from '../components/Tile';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { AxiosError } from 'axios';
import useApps from '../hooks/useApps';
import FormModal from '../common/FormModal';
import HeaderToolbar from '../common/Toolbar/HeaderToolbar';

const Application = ({ onSet }) => {
  const pageSize = 4;
  const [page, setPage] = useState<number>(1);
  const [selectedAppId, setSelectedAppId] = useState<string>();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [toastError, setToastError] = useState<string>();

  const { data: apps, error, isLoading } = useApps(page);


  useEffect(() => {
    onSet(selectedAppId);
  }, [selectedAppId, onSet]);

  //functions to open and close the toast
  const onOpenToast = (err: AxiosError) => {
    setToastError(err?.response?.data);

    setOpen(true);
  };

  const onCloseToast = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const prevPage = () => page > 1 && setPage(page - 1);

  const nextPage = () => {
    apps?.applications?.length === 4 && setPage(page + 1);
  };

  const onEdit = () => setOpen(true);

  // const applications = responseData?.applications || [];

  return (
    <>
      <HeaderToolbar title={'applications'.toUpperCase()} />
      {error && <p>{error.message}</p>}

      <Grid container spacing={3}>
        {apps?.applications?.map((app) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            display='grid'
            gridAutoFlow='column'
            key={app.id}
          >
            <Tile
              app={app}
              page={page}
              selectedApp={selectedAppId}
              setSelectedApp={setSelectedAppId}
              openToast={onOpenToast}
              open={open}
              closeToast={onCloseToast}
              toastError={toastError}
              onEdit={onEdit}
            />
          </Grid>
        ))}
        <Grid
          item
          xs={12}
          justifyContent='flex-end'
          sx={{
            textAlign: 'center',
          }}
        >
          <ButtonGroup>
            <IconButton onClick={prevPage} disabled={page === 1}>
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton
              onClick={nextPage}
              disabled={apps?.applications?.length < pageSize}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </ButtonGroup>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={onCloseToast}>
        <Alert onClose={onCloseToast} severity='error' sx={{ width: '100%' }}>
          {/* {error || "Something Went Wrong"} */}
        </Alert>
      </Snackbar>
      <FormModal open={openModal} setOpen={setOpenModal} />
    </>
  );
};

export default Application;
