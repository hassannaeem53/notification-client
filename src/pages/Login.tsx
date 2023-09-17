import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  Divider,
  Alert,
  Snackbar,
} from "@mui/material";
import CompanyLogo from "../assets/Company-logo.png";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { z } from "zod";
import HttpService from "../services/httpService";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

interface LoginInterface {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [emailValidation, setEmailValidation] = useState("");

  const [reqError, setReqError] = useState<string>();

  const emailSchema = z.string().email();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    if (emailValidation.length == 0) {
      e.preventDefault();

      //validate
      // send a request to authentication endpoint
      const service = new HttpService<LoginInterface>("/auth/login");
      try {
        const res = await service.create(formData);
        localStorage.setItem("token", res as string);

        navigate("/");
      } catch (err) {
        setReqError(err?.response?.data.message || error?.message);
      }
    }
  };

  function handleCloseAlert() {
    setReqError(undefined);
  }

  useEffect(() => {
    validateEmail();
  }, [formData.email]);

  const validateEmail = () => {
    try {
      emailSchema.parse(formData.email);
      setEmailValidation("");
    } catch (err) {
      setEmailValidation("Email is not valid");
    }
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper elevation={6} style={{ padding: "20px", width: "100%" }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} align="center">
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  fontWeight: "400",
                  marginRight: "40px",
                  marginLeft: "60px",
                  font: "Poppins",
                  fontSize: "40px",

                  color: "#032a9c",
                }}
                //color='primary'
              >
                Notify
                <NotificationsIcon
                  style={{ color: "orange", height: "auto", width: "40px" }}
                />
              </Typography>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ height: "100px" }} // Adjust the height as needed
              />
              <img
                src={CompanyLogo}
                alt=""
                width={"120px"}
                style={{ marginLeft: "40px" }}
              />
            </div>
          </Grid>

          <Grid item xs={12} align="center">
            <Typography variant="h4" gutterBottom>
              Login
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="on"
                required
              />
              {emailValidation.length > 0 && (
                <Typography variant="subtitle1" color="error">
                  {emailValidation}
                </Typography>
              )}
              <TextField
                label="Password"
                fullWidth
                margin="normal"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="on"
                required
              />
              {formData.password.length < 8 && (
                <Typography variant="subtitle1" color="error">
                  Password must be at least 8 characters long
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  backgroundColor: "#032a9c",
                  transition: "background-color 0.3s", // Add transition for smooth hover effect
                }}
                endIcon={<LockOutlinedIcon />}
                fullWidth
                // Define hover styles
                sx={{
                  "&:hover": {
                    backgroundColor: "#2351d1", // Change background color on hover
                  },
                }}
              >
                Login
              </Button>
            </form>
          </Grid>
        </Grid>
      </Paper>
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
    </Container>
  );
};

export default Login;
