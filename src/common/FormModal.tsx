import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import useModifyApp from "../hooks/useModifyApp";
import { UpdateEntity } from "../services/httpService";
import { App } from "../services/appService";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  app: App;
  page: number;
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

const FormModal = ({ open, setOpen, title, app, page }: Props) => {
  const [formData, setFormData] = useState<UpdateEntity>({});

  const modifyApp = useModifyApp(page, () => setFormData({}));

  const handleClose = () => setOpen(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    modifyApp.mutate({ id: app._id, entity: formData });
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose} sx={{ alignItems: "center" }}>
      <Box sx={style}>
        <Typography variant="h4">{title}</Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            margin="normal"
            fullWidth
            value={formData?.name}
            onChange={handleChange}
          />
          <TextField
            label="Description"
            name="description"
            multiline
            rows={3}
            fullWidth
            value={formData?.description}
            onChange={handleChange}
          />
          <Stack
            spacing={2}
            direction="row"
            sx={{
              marginTop: 3,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button variant="contained" color="error" onClick={handleClose}>
              Close
            </Button>
            <Button variant="contained" type="submit">
              {title}
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default FormModal;
