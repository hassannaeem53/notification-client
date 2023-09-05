import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles"; // Import ThemeProvider
import CssBaseline from "@mui/material/CssBaseline"; // For global CSS reset
import AppRouter from "./routes";

// Create a dark theme using createTheme
const darkTheme = createTheme({
  palette: {
    mode: "light", // Set the theme type to 'dark' for dark mode
  },
  // Add other custom theme settings here
});

const App = () => (
  <ThemeProvider theme={darkTheme}>
    <CssBaseline /> {/* Add CssBaseline for global CSS reset */}
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
