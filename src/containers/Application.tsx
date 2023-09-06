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
  // const [page, setPage] = useState<number>(1);
  const {
    data: apps,
    isLoading,
    error,
  } = useData<App>("/apps", {
    params: {
      page_size: 4,
      current_page: 2,
    },
  });

  if (isLoading) return <CircularProgress className="mx-auto" />;

  return (
    <>
      {error && <p>error</p>}
      {apps.map((app, index) => (
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
          <IconButton onClick={() => console.log("back arrow")}>
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton onClick={() => console.log("forward arrow")}>
            <ArrowForwardIosIcon />
          </IconButton>
        </ButtonGroup>
      </Grid>
    </>
  );
};

export default Application;
