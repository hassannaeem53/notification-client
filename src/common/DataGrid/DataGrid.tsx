import React, { useEffect, useState } from "react";
import {
  AlertTitle,
  Alert,
  Grid,
  Paper,
  Typography,
  Skeleton,
  Grow,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import HeaderToolbar from "../Toolbar/HeaderToolbar";
import Buttons from "../Buttons/Buttons";
import useData from "../../hooks/useData";
import FormModal from "../FormModal";
import { Container } from "react-bootstrap";
import InfoButton from "../Buttons/InfoButton";
import PaginationButtons from "../PaginationButtons";

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

  setEventId?: React.Dispatch<React.SetStateAction<string>> | undefined;
}

const DataGrid: React.FC<DataGridProps> = ({
  title,
  parentId,
  parentName,
  setEventName,
  onSet,
  setEventId,
}) => {
  const [page, setPage] = useState(1);

  const [searchInput, setSearchInput] = useState<string>("");
  const [sort, setSort] = useState<string>("asc");
  const [sortby, setSortby] = useState<string>("name");
  const [selectedId, setSelectedId] = useState<string>("");
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(true);

  const { data, error, isLoading } = useData(
    page,
    title,
    active,
    parentId,
    searchInput,
    sort,
    sortby
  );

  const onSetActive = (val: boolean) => {
    setActive(val);
  };

  useEffect(() => {
    if (searchInput.length) setPage(1); //resetting page to 1 to show search results
  }, [searchInput]);

  useEffect(() => {
    if (parentId) {
      setSelectedId("");
    }
  }, [parentId]);

  if (error)
    return (
      <Alert
        iconMapping={{
          error: <ErrorIcon fontSize="large" />,
        }}
        severity="error"
        variant="outlined"
        sx={{ marginTop: "20px" }}
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
        setOpenAddModal={setOpenAddModal}
        active={active}
        onSetActive={() => {
          setActive(!active);
          setPage(1);
        }}
      />
      <Container
        style={{ marginTop: "20px", paddingLeft: "20px", paddingRight: "20px" }}
      >
        <Grid container spacing={2}>
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <Grid item xs={6} key={index}>
                <Paper elevation={3} style={{ padding: "20px" }}>
                  <Skeleton animation="wave" variant="text" width="60%" />
                  <Skeleton animation="wave" variant="text" width="80%" />
                </Paper>
              </Grid>
            ))
          ) : data?.[title]?.length === 0 ? (
            // No items found error
            <Grid item xs={12}>
              <Alert
                severity="info"
                sx={{ marginTop: "20px", fontSize: "1.2rem" }}
              >
                No {title} found
              </Alert>
            </Grid>
          ) : (
            // Render data items
            data?.[title]?.map((item) => (
              <Grow in={true} timeout={1000} key={item._id}>
                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={16}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#CDDEEE",
                        // border: '2px solid #2196F3',
                      },
                      padding: 2,
                      backgroundColor: "#EEEEEE",
                      cursor: "pointer",
                      border:
                        selectedId === item._id && title === "events"
                          ? "2px solid #2196F3"
                          : "",
                      position: "relative",

                      display: "flex",
                      // flex: 1,
                      // minHeight: "10vw",
                      // alignItems: "center",
                      flexDirection: "column",
                      justifyContent: "center",
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
                      <Grid
                        item
                        xs={12}
                        md={8}
                        // sx={{ backgroundColor: "orange" }}
                      >
                        <Typography
                          variant="h5"
                          component="div"
                          style={{
                            fontWeight:
                              selectedId === item._id && title == "events"
                                ? "bold"
                                : "normal", // Set the font weight based on the condition
                            fontSize:
                              selectedId === item._id && title == "events"
                                ? "1.7rem"
                                : "1.5rem", // Set the font size based on the condition
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Typography variant="body2">
                          {item.description && item.description?.length > 100
                            ? item.description?.substring(0, 70) + "..."
                            : item.description}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={4}
                        sx={{
                          display: "flex",
                          justifyContent: "right",
                        }}
                      >
                        <Buttons
                          selectedEntity={item}
                          page={page}
                          entity={title}
                          setPage={setPage}
                          isActive={item.is_active}
                          parentId={parentId}
                          finalPage={data.pagination?.totalPages || 1}
                          setEventId={setEventId}
                          searchInput={searchInput}
                          sort={sort}
                          sortBy={sortby}
                          active={active}
                        />
                        <InfoButton
                          description={item.description}
                          createdDate={
                            item.created_at
                              ? new Date(item.created_at).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "numeric",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                    timeZoneName: "short",
                                  }
                                )
                              : ""
                          }
                          updatedDate={
                            item.updated_at
                              ? new Date(item.updated_at).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "numeric",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                    timeZoneName: "short",
                                  }
                                )
                              : ""
                          }
                        />
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
        <FormModal
          open={openAddModal}
          setOpen={setOpenAddModal}
          title="Add"
          page={page}
          entityName="events"
          finalPage={data?.pagination?.totalPages || 1}
          parentId={parentId}
          searchInput={searchInput}
          sort={sort}
          sortBy={sortby}
          setPage={setPage}
        />
      </Container>
    </>
  );
};

export default DataGrid;
