import CssBaseline from "@mui/material/CssBaseline"; // For global CSS reset
import { createTheme, ThemeProvider } from "@mui/material/styles"; // Import ThemeProvider
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes";

// Create a dark theme using createTheme
const darkTheme = createTheme({
  palette: {
    mode: "light", // Set the theme type to 'dark' for dark mode
    background: {
      //default: '#FF240', // Set the default background color
      // You can add more specific background colors as needed
    },
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
