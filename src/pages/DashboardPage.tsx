import React from "react";
import { Grid } from "@mui/material";
import Application from "../containers/Application";
import DataGrid from "../common/DataGrid/DataGrid"; // Import the DataGrid component

const Dashboard = () => {
  const [applicationId, setApplicationId] = React.useState<string>(""); // Add the applicationId state variable
  const [eventId, setEventId] = React.useState<string>(""); // Add the eventId state variable

  return (
    <Grid container spacing={3} sx={{ padding: 4 }}>
      <Grid item sm={12}>
        <Application onSet={(id) => setApplicationId(id)} />
      </Grid>
      <Grid item sm={12} alignItems="center">
        <DataGrid
          title="events"
          parentId={applicationId}
          onSet={(id) => setEventId(id)}
        />
      </Grid>
      <Grid item sm={12}>
        <DataGrid title="notifications" parentId={eventId} />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
