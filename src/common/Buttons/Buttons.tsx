import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Alert,
  Box,
  ButtonGroup,
  IconButton,
  Snackbar,
  Switch,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

import { useEffect, useState } from "react";
import FormModal from "../FormModal";
import { App } from "../../services/appService";
import useModifyData from "../../hooks/useModifyData";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

export interface Entity {
  _id: string;
  name: string;
  description: string;
  is_active: string;
  applicationId?: string;
  eventId?: string;
}

interface Props {
  selectedEntity: App | Entity;
  isActive?: boolean;
  open?: boolean;
  error?: string | undefined;
  page: number;
  entity: string;
  setPage: (page: number) => void;
  parentId?: string;
  finalPage: number;
  setSelectedApp?: (appId: string | undefined) => void;
  setEventId?: React.Dispatch<React.SetStateAction<string>> | undefined;
  searchInput: string;
  sort: string;
  sortBy: string;
  active: boolean;
  applicationId?: string;
}

const styles = {};

const Buttons = ({
  selectedEntity,
  isActive,
  page,
  entity,
  setPage,
  parentId,
  finalPage,
  setSelectedApp,
  setEventId,
  searchInput,
  sort,
  sortBy,
  active,
  applicationId,
}: Props) => {
  const [checked, setChecked] = useState(isActive);

  const [open, setOpen] = useState<boolean>(false);

  const [reqError, setReqError] = useState<string | undefined>(undefined);

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const navigate = useNavigate();

  const eventId = entity == "notifications" && selectedEntity.eventId;

  const deleteApp = useModifyData(
    page,
    entity,
    active,
    searchInput,
    sort,
    sortBy,
    parentId,
    (page: number | undefined) => {
      setPage(page || 1);
      setSelectedApp && setSelectedApp(undefined);
      entity === "events" && setEventId && setEventId(undefined);
    }
  );
  const onDelete = (e) => {
    e.stopPropagation();
    setOpenDialog(true);
    //deleteApp.mutate({ id: selectedEntity._id, entity: { is_deleted: true } });
  };

  const handleCloseDialog = (e) => {
    e.stopPropagation();
    setOpenDialog(false);
  };

  const handleDelete = () => {
    deleteApp.mutate({ id: selectedEntity._id, entity: { is_deleted: true } });
    setOpenDialog(false);
  };

  const toggleApp = useModifyData(
    page,
    entity,
    active,
    searchInput,
    sort,
    sortBy,
    parentId,
    (page: number) => {
      setChecked(!checked);
      setPage(page || 1);
      setSelectedApp && setSelectedApp(undefined);
      entity === "events" && setEventId && setEventId(undefined);
    }
  );

  const onToggle = (e) => {
    e.stopPropagation();

    const updatedEntity = { is_active: !checked };
    toggleApp.mutate({ id: selectedEntity._id, entity: updatedEntity });

    if (toggleApp.isError) {
      setReqError(toggleApp.error.message);
    }
  };

  const onEdit = (e) => {
    e.stopPropagation();
    if (entity === "events" || entity === "applications") setOpen(true);
    else
      navigate(`/notification-preview/${selectedEntity._id}`, {
        state: { entity: selectedEntity, applicationId, eventId },
      });
  };

  useEffect(() => {
    if (toggleApp.error)
      setReqError(
        toggleApp.error?.response?.data?.message ||
          toggleApp.error?.response?.data?.error ||
          toggleApp.error.message
      );
    if (deleteApp.error)
      setReqError(
        deleteApp.error?.response?.data?.message ||
          deleteApp.error?.response?.data?.error ||
          deleteApp.error.message
      );
  }, [toggleApp.error, deleteApp.error]);

  function handleCloseAlert() {
    setReqError(undefined);
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <ButtonGroup size="medium" aria-label="medium button group" sx={styles}>
          <Tooltip title="Active Status">
            <Switch
              checked={checked}
              onClick={onToggle}
              //color='primary'
              size="medium"
              checkedIcon={<CheckCircleIcon color="primary" />}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton color="inherit" onClick={onEdit}>
              <EditIcon color="action" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton color="inherit" onClick={onDelete}>
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
      </Box>
      <FormModal
        open={open}
        setOpen={setOpen}
        title="Edit"
        selectedEntity={selectedEntity}
        page={page}
        entityName={entity}
        parentId={parentId}
        finalPage={finalPage}
        searchInput={searchInput}
        sort={sort}
        sortBy={sortBy}
        active={active}
        setPage={setPage}
      />
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this{" "}
            {entity.substring(0, entity.length - 1)}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonGroup>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              onClick={handleDelete}
              // sx={{ marginLeft: '10px' }}
              autoFocus
            >
              Delete
            </Button>
          </ButtonGroup>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={reqError !== undefined}
        autoHideDuration={5000}
        onClose={handleCloseAlert}
        message={reqError || ""}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {reqError}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Buttons;
