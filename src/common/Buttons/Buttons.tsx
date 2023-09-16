import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, ButtonGroup, IconButton, Switch } from "@mui/material";
import { useState } from "react";
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
  // console.log("🚀 ~ file: Buttons.tsx:51 ~ selectedEntity:", selectedEntity);
  const [checked, setChecked] = useState(isActive);

  const [open, setOpen] = useState<boolean>(false);

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
    // setChecked(!checked);
    const updatedEntity = { is_active: !checked };
    toggleApp.mutate({ id: selectedEntity._id, entity: updatedEntity });
  };

  const onEdit = () => setOpen(true);

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
    </>
  );
};

export default Buttons;
