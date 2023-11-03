import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Stack,
  Alert,
  Snackbar,
} from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { UpdateEntity } from "../services/httpService";
import { App } from "../services/appService";
import { Entity } from "./Buttons/Buttons";
import useModifyData from "../hooks/useModifyData";
import useAddData from "../hooks/useAddData";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  selectedEntity?: Entity | App;
  page: number;
  entityName: string;
  parentId?: string;
  finalPage: number;
  searchInput?: string;
  sort?: string;
  sortBy?: string;
  active?: boolean;
  setPage: (page: number) => void;
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
  searchInput,
  sort,
  sortBy,
  active,
  setPage,
}: Props) => {
  const [formData, setFormData] = useState<UpdateEntity | AddEntity>({
    name: selectedEntity?.name,
    description: selectedEntity?.description,
  });

  const [reqError, setReqError] = useState<string | undefined>(undefined);

  //defining from schema
  const formSchema = z.object({
    name: z
      .string()
      .min(3, "name should be atleast 3 characters long")
      .max(50, "name should not be more than 50 characters long"),
    description: z
      .string()
      .min(10, "description should be atleast 10 characters long")
      .max(200, "description should not be more than 200 characters long"),
  });

  type FormSchemaType = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    defaultValues: formData,
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    setFormData(data);
    // e.preventDefault();
    if (title === "Edit")
      modifyEntity.mutate({ id: selectedEntity?._id || "", entity: data });
    else {
      //add case
      let entityToAdd = { ...data };
      if (entityName == "events")
        entityToAdd = { ...entityToAdd, applicationId: parentId };
      else if (entityName == "notifications")
        entityToAdd = { ...entityToAdd, eventId: parentId };
      addEntity.mutate(entityToAdd);
    }
    handleClose();
  };

  useEffect(() => {
    if (title == "Edit") {
      reset({
        name: selectedEntity?.name,
        description: selectedEntity?.description,
      });

      setFormData({
        name: selectedEntity?.name,
        description: selectedEntity?.description,
      });
    }
  }, [selectedEntity, title]);

  const modifyEntity = useModifyData(
    page,
    entityName,
    active,
    searchInput,
    sort,
    sortBy,
    parentId,
    () => setFormData({ name: "", description: "" })
  );

  const addEntity = useAddData(entityName, finalPage, parentId, () =>
    setPage(page)
  );

  const handleClose = () => {
    if (title == "Add") {
      reset();
      setFormData({});
    } else {
      reset(formData);
      setFormData({
        name: selectedEntity?.name,
        description: selectedEntity?.description,
      });
    }
    setOpen(false);
  };

  function handleCloseAlert() {
    setReqError(undefined);
  }

  useEffect(() => {
    if (addEntity.error)
      setReqError(
        addEntity.error?.response?.data?.message ||
          addEntity.error?.response?.data?.error ||
          addEntity.error.message
      );
    if (modifyEntity.error)
      setReqError(
        modifyEntity.error?.response?.data?.message ||
          modifyEntity.error?.response?.data?.error ||
          modifyEntity.error.message
      );
  }, [addEntity.error, modifyEntity.error]);

  return (
    <>
      <Modal open={open} onClose={handleClose} sx={{ alignItems: "center" }}>
        <Box sx={style}>
          <Typography variant="h4">{title}</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Name"
              // name="name"
              id="name"
              margin="normal"
              fullWidth
              // value={formData?.name}
              // onChange={handleChange}
              {...register("name")}
              required
            />

            {errors.name && (
              <Typography color="error" sx={{ marginBottom: 2 }}>
                {errors.name.message}
              </Typography>
            )}

            <TextField
              label="Description"
              // name="description"
              id="description"
              multiline
              rows={3}
              fullWidth
              // value={formData?.description}
              // onChange={handleChange}
              required
              {...register("description")}
            />
            {errors.description && (
              <Typography color="error" sx={{ marginBottom: 1 }}>
                {errors.description.message}
              </Typography>
            )}
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
              <Button
                variant="contained"
                type="submit"
                disabled={Object.keys(errors).length !== 0}
              >
                {title}
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
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

export default FormModal;
