import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, ButtonGroup, IconButton, Switch } from "@mui/material";
import { useState } from "react";
import { AxiosError } from "axios";
import useDeleteApp from "../hooks/useDeleteApp";
import useToggleApp from "../hooks/useToggleApp";
import FormModal from "./FormModal";

interface Props {
  selectedAppId: number;
  isActive: boolean;
  openToast: (err: AxiosError) => void;
  closeToast: () => void;
  open: boolean;
  // onDelete: (id: number) => void;
  error: string | undefined;
  page: number;
  // onEdit: () => void;
}

const styles = { backgroundColor: "#BABABA", borderRadius: 2 };

const Buttons = ({ selectedAppId, isActive, page }: Props) => {
  const [checked, setChecked] = useState(isActive);
  const [open, setOpen] = useState<boolean>(false);

  const deleteApp = useDeleteApp(page, () => setChecked(false));
  const onDelete = () => {
    deleteApp.mutate(selectedAppId);
  };

  const toggleApp = useToggleApp(page, () => setChecked(!checked));
  const onToggle = () => {
    const updatedEntity = [{ is_active: !checked }];
    toggleApp.mutate({ id: selectedAppId, entity: updatedEntity });
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
      <FormModal open={open} setOpen={setOpen} title="Add" />
    </>
  );
};

export default Buttons;