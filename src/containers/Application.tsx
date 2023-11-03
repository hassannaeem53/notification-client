import {
  Alert,
  AlertTitle,
  Grid,
  Paper,
  Skeleton,
  Slide,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Tile from "../components/Tile";
import ErrorIcon from "@mui/icons-material/Error"; // Import the Error icon from Material-UI
import useData from "../hooks/useData";
import HeaderToolbar from "../common/Toolbar/HeaderToolbar";
import FormModal from "../common/FormModal";
import PaginationButtons from "../common/PaginationButtons";
import pageState from "../hooks/usePageState";
import { useBetween } from "use-between";

interface Props {
  onSet: (id: string) => void;
  onSetName: (name: string) => void;
  applicationId: string;
  setAppDataAvailable: React.Dispatch<React.SetStateAction<boolean>>;
}

const Application = ({
  onSet,
  onSetName,
  applicationId,
  setAppDataAvailable,
}: Props) => {
  // const [appPage, setPage] = useState<number>(1);
  const [selectedAppId, setSelectedAppId] = useState<string>(applicationId);
  const [open, setOpen] = useState(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [sort, setSort] = useState<string>("asc");
  const [sortby, setSortby] = useState<string>("name");
  const [previousPage, setPreviousPage] = useState<number | null>(null);
  const [active, setActive] = useState<boolean>(true);

  const { appPage, setAppPage } = useBetween(pageState);

  //getting all apps
  const {
    data: apps,
    error,
    isLoading,
  } = useData(
    appPage,
    "applications",
    active,
    undefined,
    searchInput,
    sort,
    sortby
  );

  useEffect(() => {
    onSet(selectedAppId);
  }, [selectedAppId, onSet]);

  const handlePageChange = (newPage: number) => {
    setPreviousPage(appPage);
    setAppPage(newPage);
  };

  //updating state to decide whether select app info message should be displayed
  useEffect(() => {
    if (apps?.applications?.length !== 0)
      setAppDataAvailable && setAppDataAvailable(true);
    else setAppDataAvailable && setAppDataAvailable(false);
  }, [apps]);

  const getSlideDirection = () => {
    if (previousPage === null) {
      return "left"; // Initial render, slide from the left
    } else if (appPage > previousPage) {
      return "left"; // Navigating to the next page, slide from the right
    } else {
      return "right"; // Navigating to the previous page, slide from the left
    }
  };

  const onEdit = () => setOpen(true);

  useEffect(() => {
    if (searchInput.length) setAppPage(1); //resetting page to 1 to show search results
  }, [searchInput]);

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
      <HeaderToolbar
        title={"applications".toUpperCase()}
        onSet={setSearchInput}
        setSort={setSort}
        setSortby={setSortby}
        setOpenAddModal={setOpenAddModal}
        setPage={setAppPage}
        active={active}
        onSetActive={() => {
          setActive(!active);
          setAppPage(1);
        }}
      />

      <Grid
        container
        spacing={3}
        sx={{
          marginTop: 0.05,
          paddingLeft: "40px",
        }}
      >
        {apps?.applications?.length === 0 && (
          <Grid item xs={12}>
            <Alert severity="info" sx={{ marginTop: "20px" }}>
              No Items Found
            </Alert>
          </Grid>
        )}

        {apps?.applications?.map((app) => (
          <Slide
            direction={getSlideDirection()} // Dynamic slide direction
            in={true}
            mountOnEnter
            unmountOnExit
            key={app._id}
          >
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
                page={appPage}
                selectedApp={selectedAppId}
                setSelectedApp={setSelectedAppId}
                open={open}
                onEdit={onEdit}
                onSetName={onSetName}
                setPage={setAppPage}
                finalPage={apps.pagination?.totalPages || 1}
                searchInput={searchInput}
                sort={sort}
                sortBy={sortby}
                active={active}
              />
            </Grid>
          </Slide>
        ))}

        <PaginationButtons
          currentPage={appPage}
          totalPages={apps.pagination?.totalPages}
          setPage={handlePageChange}
        />
      </Grid>
      {apps?.pagination?.totalCount > 0 && (
        <Typography
          variant="subtitle1"
          component="div"
          sx={{
            marginRight: "40px",
            marginTop: "6px",
            display: "flex",
            justifyContent: "flex-end", // Align to the right
            alignItems: "center", // Vertically center the text
            color: "#2196F3",
            textAlign: "center",
          }}
        >
          <strong>TOTAL APPLICATIONS: {apps?.pagination?.totalCount}</strong>
        </Typography>
      )}

      <FormModal
        open={openAddModal}
        setOpen={setOpenAddModal}
        title="Add"
        page={appPage}
        entityName="applications"
        finalPage={apps.pagination?.totalPages || 1}
        setPage={setAppPage}
      />
    </>
  );
};

export default Application;
