import {
  Alert,
  AlertTitle,
  Grid,
  Paper,
  Skeleton,
  Snackbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import Tile from "../components/Tile";
import { AxiosError } from "axios";
import ErrorIcon from "@mui/icons-material/Error"; // Import the Error icon from Material-UI
import useData from "../hooks/useData";
import { App } from "../services/appService";
import PaginationButtons from "../common/NavButtons";


interface Props {
  onSet: (id: string) => void;
}

const Application = ({ onSet }: Props) => {
  const [page, setPage] = useState<number>(1);
  const [selectedAppId, setSelectedAppId] = useState<string>();
  const [open, setOpen] = useState(false);
  const [toastError, setToastError] = useState<string>();

  //getting all apps
  const { data: apps, error, isLoading } = useData<App>(page, "applications");

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
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const onEdit = () => setOpen(true);

  if (isLoading) {
    // Display skeleton placeholders when data is loading
    const skeletonItems = Array.from({ length: 4 }).map((_, index) => (
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        key={index}
        display="grid"
        gridAutoFlow="column"
      >
        <Paper
          elevation={8}
          sx={{
            padding: 1,
            backgroundColor: "#EEEEEE",
            borderRadius: 4,
            display: "flex",
            minHeight: "15vw",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: "15vw",
          }}
        >
          <Skeleton animation="wave" variant="text" width="60%" />
          <Skeleton animation="wave" variant="text" width="80%" />
          <Skeleton animation="wave" variant="text" width="60%" />
          <Skeleton animation="wave" variant="text" width="80%" />
        </Paper>
      </Grid>
    ));

    return (
      <Grid container spacing={3}>
        {skeletonItems}
      </Grid>
    );
  }

  if (error) {
    return (
      <Alert
        iconMapping={{
          error: <ErrorIcon fontSize="large" />, // Customize the error icon size
        }}
        severity="error"
        variant="outlined"
        sx={{ marginTop: "20px" }}
      >
        <AlertTitle>Error</AlertTitle>
        Unable to Fetch Apps<strong> {error.message}</strong>
      </Alert>
    );
  }

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
            display="grid"
            gridAutoFlow="column"
            key={app._id}
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
        <PaginationButtons
          currentPage={page}
          totalPages={apps.pagination?.totalPages}
          setPage={setPage}
        />
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
