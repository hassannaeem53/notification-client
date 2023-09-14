import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, ButtonGroup, IconButton, Switch } from "@mui/material";
import { useState } from "react";
import { AxiosError } from "axios";
import FormModal from "../FormModal";
import { App } from "../../services/appService";
import useModifyData from "../../hooks/useModifyData";

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
  openToast?: (err: AxiosError) => void;
  closeToast?: () => void;
  open?: boolean;
  error?: string | undefined;
  page: number;
  entity: string;
  setPage: (page: number) => void;
}

const styles = { backgroundColor: "#BABABA", borderRadius: 2 };

const Buttons = ({
  selectedEntity,
  isActive,
  page,
  entity,
  setPage,
}: Props) => {
  const [checked, setChecked] = useState(isActive);

  const [open, setOpen] = useState<boolean>(false);

  const deleteApp = useModifyData(
    page,
    entity,
    undefined,
    (page: number | undefined) => setPage(page || 1)
  );
  const onDelete = () => {
    deleteApp.mutate({ id: selectedEntity._id, entity: { is_deleted: true } });
  };

  const toggleApp = useModifyData(page, entity, undefined, () =>
    setChecked(!checked)
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
          <Switch checked={checked} onClick={onToggle} color="primary" />

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
      />
    </>
  );
};

export default Buttons;
