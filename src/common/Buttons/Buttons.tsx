import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Alert,
  Box,
  ButtonGroup,
  IconButton,
  Snackbar,
  Switch,
} from "@mui/material";
import { useEffect, useState } from "react";
import FormModal from "../FormModal";
import { App } from "../../services/appService";
import useModifyData from "../../hooks/useModifyData";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export interface Entity {
  _id: string;
  name: string;
  description: string;
  is_active: string;
  applicationId?: string;
  event_id?: string;
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
}: Props) => {
  const [checked, setChecked] = useState(isActive);

  const [open, setOpen] = useState<boolean>(false);

  const [reqError, setReqError] = useState<string | undefined>(undefined);

  const deleteApp = useModifyData(
    page,
    entity,
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
  const onDelete = () => {
    deleteApp.mutate({ id: selectedEntity._id, entity: { is_deleted: true } });
  };

  const toggleApp = useModifyData(
    page,
    entity,
    searchInput,
    sort,
    sortBy,
    parentId,
    () => setChecked(!checked)
  );

  const onToggle = () => {
    const updatedEntity = { is_active: !checked };
    toggleApp.mutate({ id: selectedEntity._id, entity: updatedEntity });

    if (toggleApp.isError) {
      setReqError(toggleApp.error.message);
    }
  };

  const onEdit = () => setOpen(true);

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
      <Box>
        <ButtonGroup size="medium" aria-label="medium button group" sx={styles}>
          <Switch
            checked={checked}
            onClick={onToggle}
            //color='primary'
            size="medium"
            checkedIcon={<CheckCircleIcon color="primary" />}
          />

          <IconButton color="inherit" onClick={onEdit}>
            <EditIcon color="action" />
          </IconButton>

          <IconButton color="inherit" onClick={onDelete}>
            <DeleteIcon color="error" />
          </IconButton>
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
      />
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
