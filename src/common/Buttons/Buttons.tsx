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
import { useState } from "react";
import { AxiosError } from "axios";
import appService from "../../services/appService";

interface Props {
  selectedAppId: number;
  isActive: boolean;
  openToast: (err: AxiosError) => void;
  closeToast: () => void;
  open: boolean;
  onDelete: (id: number) => void;
  error: string;
}

const styles = { backgroundColor: "#BABABA", borderRadius: 2 };

const Buttons = ({
  selectedAppId,
  isActive,
  openToast,
  closeToast,
  open,
  error,
  onDelete,
}: Props) => {
  const [checked, setChecked] = useState(isActive);

  const onToggle = () => {
    const updatedEntity = [{ is_active: !checked }];
    appService
      .update(selectedAppId, updatedEntity)
      .then(() => setChecked(!checked))
      .catch((err) => {
        openToast(err);
      });
  };

  return (
    <Box>
      <ButtonGroup size="medium" aria-label="medium button group" sx={styles}>
        <Switch checked={checked} onClick={onToggle} color="primary" />
        <IconButton color="inherit">
          <EditIcon color="action" />
        </IconButton>

        <IconButton color="inherit" onClick={() => onDelete(selectedAppId)}>
          <DeleteIcon color="error" />
        </IconButton>
      </ButtonGroup>
      <Snackbar open={open} autoHideDuration={6000} onClose={closeToast}>
        <Alert onClose={closeToast} severity="error" sx={{ width: "100%" }}>
          {error || "Something Went Wrong"}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Buttons;
