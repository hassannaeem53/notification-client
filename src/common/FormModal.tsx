import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Modal,
  TextField,
  Typography,
  ButtonGroup,
  Stack,
} from "@mui/material";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

const FormModal = ({ open, setOpen, title }: Props) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Modal open={open} onClose={handleClose} sx={{ alignItems: "center" }}>
      <Box sx={style}>
        <Typography variant="h4">{title}</Typography>
        <FormControl>
          <TextField label="Name" sx={{ marginY: 3 }} />
          <TextField label="Description" multiline rows={3} />
        </FormControl>
        <Stack
          spacing={2}
          direction="row"
          sx={{
            marginTop: 3,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button variant="contained">{title}</Button>
          <Button variant="contained" color="error">
            Close
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default FormModal;
