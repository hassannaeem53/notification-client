import { Grid, Box } from "@mui/material";
import Application from "../containers/Application";

const Dashboard = () => {
  return (
    <Grid container spacing={3} sx={{ padding: 4 }}>
      {/* <Grid container item spacing={4}> */}
      <Grid item sm={12}>
        <Application />
      </Grid>
      <Grid item sm={12} alignItems="center">
        <Box sx={{ border: "3px solid black", p: 2, textAlign: "center" }}>
          Events
        </Box>
      </Grid>
      <Grid item sm={12}>
        <Box sx={{ border: "3px solid black", p: 2, textAlign: "center" }}>
          Notifications
        </Box>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
