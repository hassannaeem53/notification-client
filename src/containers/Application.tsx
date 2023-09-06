import { ButtonGroup, CircularProgress, Grid, IconButton } from "@mui/material";
import { useState } from "react";
import Tile from "../components/Tile";
import useData from "../hooks/useData";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Carousel from "react-material-ui-carousel";
import useModifyData from "../hooks/useModifyData";
import appService from "../services/appService";
import { AxiosError } from "axios";

const dummyApps = [
  [
    {
      name: "App1",
      description: "desc1",
    },
    {
      name: "App2",
      description: "desc2",
    },
    {
      name: "App3",
      description: "desc3",
    },
  ],
];

export interface App {
  id: number;
  name: string;
  description?: string;
  is_active: boolean;
}

const Application = () => {
  const [page, setPage] = useState<number>(1);
  const [selectedAppId, setSelectedApp] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [toastError, setToastError] = useState<string | unknown>();
  const [dataUpdateTrigger, setDataUpdateTrigger] = useState(true);

  const pageSize = 4;

  const {
    data: apps,
    isLoading,
    error,
  } = useData<App>(
    appService,
    {
      params: {
        page_size: pageSize,
        current_page: page,
      },
    },
    [page, dataUpdateTrigger]
  );
  console.log("selected app:", selectedAppId);

  const onDelete = (id: number) => {
    appService
      .delete(id)
      .then(() => setDataUpdateTrigger(!dataUpdateTrigger))
      .catch((err) => onOpenToast(err));
  };

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

  const previousPage = () => page > 1 && setPage(page - 1);

  const nextPage = () => {
    apps.length === 4 && setPage(page + 1);
  };

  if (isLoading) return <CircularProgress className="mx-auto" />;

  return (
    <>
      {error && <p>error</p>}
      <Carousel
        next={nextPage}
        prev={previousPage}
        indicators={false}
        swipe={false}
        animation="slide"
        duration={100}
        autoPlay={false}
      >
        {apps.length &&
          [apps].map(
            (appArray, index) => (
              // <Grid item xs={12} md={3} style={{ display: "flex" }} key={index}>
              <Grid container spacing={3} key={index}>
                {appArray.map((app) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    key={app.id}
                    display="grid"
                    gridAutoFlow="column"
                  >
                    <Tile
                      app={app}
                      selectedApp={selectedAppId}
                      setSelectedApp={setSelectedApp}
                      onDelete={onDelete}
                      openToast={onOpenToast}
                      open={open}
                      closeToast={onCloseToast}
                      toastError={toastError}
                    />
                  </Grid>
                ))}
              </Grid>
            )

            // </Grid>
          )}
      </Carousel>
      {/* <Grid
        item
        xs={12}
        justifyContent="flex-end"
        sx={{
          textAlign: "center",
        }}
      >
        <ButtonGroup>
          <IconButton onClick={previousPage} disabled={page === 1}>
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton onClick={nextPage} disabled={apps.length < pageSize}>
            <ArrowForwardIosIcon />
          </IconButton>
        </ButtonGroup>
      </Grid> */}
    </>
  );
};

export default Application;
