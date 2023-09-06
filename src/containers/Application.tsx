import { ButtonGroup, CircularProgress, Grid, IconButton } from "@mui/material";
import { useState } from "react";
import Tile from "../components/Tile";
import useData from "../hooks/useData";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

// const apps = [
//   {
//     name: "App1",
//     description: "desc1",
//   },
//   {
//     name: "App2",
//     description: "desc2",
//   },
//   {
//     name: "App3",
//     description: "desc3",
//   },
// ];

interface App {
  id: number;
  name: string;
  description?: string;
  // created_at: string;
  // created_by: string;
  is_active: boolean;
}

const Application = () => {
  const [page, setPage] = useState<number>(1);
  const pageSize = 4;
  const {
    data: apps,
    isLoading,
    error,
  } = useData<App>(
    "/apps",
    {
      params: {
        page_size: pageSize,
        current_page: page,
      },
    },
    [page]
  );

  const previousPage = () => page > 1 && setPage(page - 1);
  const nextPage = () => {
    apps.length === 4 && setPage(page + 1);
  };

  if (isLoading) return <CircularProgress className="mx-auto" />;

  return (
    <>
      {error && <p>error</p>}
      {apps.length &&
        apps.map((app, index) => (
          <Grid item xs={12} md={3} style={{ display: "flex" }} key={index}>
            <Tile appName={app.name} appDescription={app.description} />
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
          <IconButton onClick={previousPage} disabled={page === 1}>
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton onClick={nextPage} disabled={apps.length < pageSize}>
            <ArrowForwardIosIcon />
          </IconButton>
        </ButtonGroup>
      </Grid>
    </>
  );
};

export default Application;
