import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import {
  Button,
  TextField,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  MentionsInput,
  Mention,
  SuggestionDataItem,
  DataFunc,
} from "react-mentions";
import "./NotificationForm.css";
import useCreateNotification from "../../hooks/useCreateNotification";
import useFetchTags from "../../hooks/useFetchTags";
import notificationSchema from "./notificationSchema";
import { Entity } from "../../common/Buttons/Buttons";
import { useLocation, useNavigate } from "react-router-dom";

interface FormValues {
  name: string;
  description: string;
  templatebody: string;
  tags: SuggestionDataItem[] | DataFunc;
  templatesubject: string;
}

interface Props {
  onChange: (formData: FormValues) => void;
  eventId?: string;
}

const NotificationForm: React.FC<Props> = ({ onChange, eventId }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const entityData = location.state?.entity;

  const [formData, setFormData] = useState<FormValues>({
    name: entityData?.name || "",
    description: entityData?.description || "",
    templatebody: entityData?.templatebody || "",
    tags: entityData?.tags || [],
    templatesubject: entityData?.templatesubject || "",
  });
  const [validationError, setValidationError] = useState<string | null>(null);
  const { createNotification, status } = useCreateNotification();
  const [apiError, setApiError] = useState<string | null>(null); // Store API error message
  const { tags: tagData, loading, error } = useFetchTags();
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

  useEffect(() => {
    entityData && onChange(entityData);
  }, [entityData]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      tags: tagData,
    }));
  }, [tagData]);

  useEffect(() => {
    // Handle status.error from useCreateNotification
    if (status.error) {
      setApiError(status.error);
    }
  }, [status.error]);

  useEffect(() => {
    // Handle status.success from useCreateNotification
    if (status.success) {
      setSuccessSnackbarOpen(true);

      // Automatically close the success Snackbar after 5 seconds
      setTimeout(() => {
        setSuccessSnackbarOpen(false);
      }, 5000);
    }
  }, [status.success]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);
    onChange(newData);
  };

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      notificationSchema.parse(formData);
      const inputData = {
        name: formData.name,
        description: formData.description,
        templatebody: formData.templatebody,
        templatesubject: formData.templatesubject,
        eventId: eventId || entityData.eventId,
      };
      if (entityData) await createNotification(inputData, true);
      else await createNotification(inputData, false);
      // Reset the form data on successful submission
      if (!status.error && !apiError) {
        setFormData((prevData) => ({
          ...prevData,
          name: "",
          description: "",
          templatebody: "",
          templatesubject: "",
        }));

        //console.log('tags', tagData);
        // Set form submission status to true
        setFormSubmitted(true);
        window.location.href = "/";
      } else {
        setApiError(status.error);
      }
    } catch (error) {
      if (error.message) {
        setValidationError(error.message);
        setFormSubmitted(false);
      }
      // Handle other errors (e.g., API error)
      // You can set status.error or display a different error message to the user
    }
  };

  const handleMentionsInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTemplatebody = formData.templatebody + "\n";

      handleChange({
        target: { name: "templatebody", value: newTemplatebody },
      });
      // console.log('newTemplatebody', formData.templatebody);
    }
  };

  return (
    <>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <form onSubmit={handleSubmit} style={{ height: "470px" }}>
          <TextField
            label="Notification Name"
            variant="outlined"
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            label="Template Subject"
            variant="outlined"
            fullWidth
            name="templatesubject"
            value={formData.templatesubject}
            onChange={handleChange}
            margin="normal"
            required
          />

          <div onKeyDown={(e) => handleMentionsInputKeyDown(e)}>
            <MentionsInput
              className="custom-mentions-input"
              value={formData.templatebody}
              onChange={(e) =>
                handleChange({
                  target: { name: "templatebody", value: e.target.value },
                })
              }
              readOnly={false}
              placeholder="Template Body"
              required
            >
              <Mention
                trigger="{{"
                data={formData.tags}
                renderSuggestion={(suggestion, search, highlightedDisplay) => (
                  <div className="custom-mention">{highlightedDisplay}</div>
                )}
                displayTransform={(id, display) => `{{${display}}}`}
                markup="{{__display__}}"
              />
            </MentionsInput>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginRight: "20px" }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="error"
              type="button"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Paper>
      {status.loading && (
        <div className="loading-overlay">
          <CircularProgress size={60} />
        </div>
      )}
      <Snackbar
        open={validationError !== null}
        autoHideDuration={5000}
        message={validationError || ""}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => {
          setValidationError(null);
        }}
      >
        <Alert severity="error" sx={{ width: "100%" }} variant="filled">
          {validationError}
        </Alert>
      </Snackbar>
      <Snackbar
        open={apiError !== null} // Display Snackbar for API error
        autoHideDuration={5000}
        message={apiError || ""}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => {
          setApiError(null); // Reset API error
        }}
      >
        <Alert severity="error" sx={{ width: "100%" }} variant="filled">
          {apiError}
        </Alert>
      </Snackbar>
      <Snackbar
        open={successSnackbarOpen && status.success}
        autoHideDuration={null} // Set to null to prevent auto-hide
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => {
          // Reset form submission status and hide the Snackbar
          setSuccessSnackbarOpen(false);
          status.success = false;
        }}
      >
        <Alert severity="success" sx={{ width: "100%" }} variant="filled">
          Notification Created Successfully
        </Alert>
      </Snackbar>
    </>
  );
};

export default NotificationForm;
