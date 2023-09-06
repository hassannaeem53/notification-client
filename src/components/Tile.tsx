import { Card, CardActions, CardContent, Typography } from "@mui/material";
import Buttons from "../common/Buttons/Buttons";

interface Props {
  appName: string;
  appDescription?: string;
  appId: number;
  selectedApp: number;
  setSelectedApp: (appId: number) => void;
}

const Tile = ({
  appName,
  appDescription,
  appId,
  selectedApp,
  setSelectedApp,
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
        border: selectedApp === appId ? "3px solid #303030" : "",
      }}
      onClick={() => setSelectedApp(appId)}
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
        <Typography variant="h6">{appName}</Typography>
        <Typography variant="caption">{appDescription}</Typography>
      </CardContent>
      <CardActions>
        <Buttons />
      </CardActions>
    </Card>
  );
};

export default Tile;
