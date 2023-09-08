import {
  Alert,
  ButtonGroup,
  CircularProgress,
  Grid,
  IconButton,
  Snackbar,
} from "@mui/material";
import { useState } from "react";
import Tile from "../components/Tile";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { AxiosError } from "axios";
import useApps from "../hooks/useApps";

const Application = () => {
  const pageSize = 4;
  const [page, setPage] = useState<number>(1);
  const [selectedAppId, setSelectedApp] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [toastError, setToastError] = useState<string>();

  const { data: apps, error, isLoading } = useApps(page);

  //functions to open and close the toast
  const onOpenToast = (err: AxiosError) => {
    setToastError(err?.response?.data);

    setOpen(true);
  };

  const onCloseToast = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const prevPage = () => page > 1 && setPage(page - 1);

  const nextPage = () => {
    apps?.length === 4 && setPage(page + 1);
  };

  if (isLoading) return <CircularProgress className="mx-auto" />;

  return (
    <>
      {error && <p>{error.message}</p>}

      <Grid container spacing={3}>
        {apps?.map((app) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            display="grid"
            gridAutoFlow="column"
            key={app.id}
          >
            <Tile
              app={app}
              page={page}
              selectedApp={selectedAppId}
              setSelectedApp={setSelectedApp}
              openToast={onOpenToast}
              open={open}
              closeToast={onCloseToast}
              toastError={toastError}
            />
          </Grid>
        ))}
        <Grid
          item
          xs={12}
          justifyContent="flex-end"
          sx={{
            textAlign: "center",
          }}
        >
          <ButtonGroup>
            <IconButton onClick={prevPage} disabled={page === 1}>
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton onClick={nextPage} disabled={apps?.length < pageSize}>
              <ArrowForwardIosIcon />
            </IconButton>
          </ButtonGroup>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={onCloseToast}>
        <Alert onClose={onCloseToast} severity="error" sx={{ width: "100%" }}>
          {/* {error || "Something Went Wrong"} */}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Application;
