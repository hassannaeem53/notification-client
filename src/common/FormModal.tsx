import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { UpdateEntity } from "../services/httpService";
import { App } from "../services/appService";
import { Entity } from "./Buttons/Buttons";
import useModifyData from "../hooks/useModifyData";
import useAddData from "../hooks/useAddData";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  selectedEntity?: Entity | App;
  page: number;
  entityName: string;
  parentId?: string;
  finalPage: number;
}

interface AddEntity {
  name: string;
  description?: string;
  applicationId?: string;
  eventId?: string;
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

const FormModal = ({
  open,
  setOpen,
  title,
  selectedEntity,
  page,
  entityName,
  parentId,
  finalPage,
}: Props) => {
  const [formData, setFormData] = useState<UpdateEntity | AddEntity>({
    name: selectedEntity?.name,
    description: selectedEntity?.description,
  });

  useEffect(() => {
    if (title == "Edit")
      setFormData({
        name: selectedEntity?.name,
        description: selectedEntity?.description,
      });
  }, [selectedEntity]);

  const modifyEntity = useModifyData(page, entityName, parentId, () =>
    setFormData({ name: "", description: "" })
  );

  const addEntity = useAddData(entityName, finalPage, parentId);

  const handleClose = () => {
    if (title == "Add") setFormData({});
    // setFormData({
    //   name: selectedEntity?.name,
    //   description: selectedEntity?.description,
    // });
    setOpen(false);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title === "Edit")
      modifyEntity.mutate({ id: selectedEntity?._id || "", entity: formData });
    else {
      //add case
      let entityToAdd = { ...formData };
      if (entityName == "events")
        entityToAdd = { ...entityToAdd, applicationId: parentId };
      else if (entityName == "notifications")
        entityToAdd = { ...entityToAdd, eventId: parentId };
      addEntity.mutate(entityToAdd);
    }
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
