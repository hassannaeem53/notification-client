import { Card, CardActions, CardContent, Typography } from "@mui/material";
import Buttons from "../common/Buttons";
import { AxiosError } from "axios";
import { App } from "../hooks/useApps";

interface Props {
  app: App;
  selectedApp: number;
  setSelectedApp: (appId: number) => void;
  // onDelete: (id: number) => void;
  openToast: (err: AxiosError) => void;
  closeToast: () => void;
  open: boolean;
  toastError: string | undefined;
  page: number;
  onEdit: () => void;
}

const Tile = ({
  app,
  selectedApp,
  setSelectedApp,
  open,
  openToast,
  closeToast,
  // onDelete,
  page,
  toastError,
  onEdit,
}: Props) => {
  return (
    <Card
      sx={{
        padding: 1,
        backgroundColor: "#EEEEEE",
        borderRadius: 4,
        display: "flex",
        minHeight: "15vw",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        border: selectedApp === app.id ? "3px solid #303030" : "",
      }}
      onClick={() => setSelectedApp(app.id)}
    >
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          textAlign: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">{app.name}</Typography>
        <Typography variant="caption">{app.description}</Typography>
      </CardContent>
      <CardActions>
        <Buttons
          selectedApp={app}
          isActive={app.is_active}
          openToast={openToast}
          closeToast={closeToast}
          open={open}
          page={page}
          error={toastError}
        />
      </CardActions>
    </Card>
  );
};

export default Tile;
