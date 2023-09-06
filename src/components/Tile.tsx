import { Card, CardActions, CardContent, Typography } from "@mui/material";
import Buttons from "../common/Buttons/Buttons";

interface Props {
  appName: string;
  appDescription?: string;
}

const Tile = ({ appName, appDescription }: Props) => {
  return (
    <Card
      sx={{
        padding: 1,
        backgroundColor: "#EEEEEE",
        borderRadius: 4,
        display: "flex",
        minHeight: "15vw",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6">{appName}</Typography>
        <Typography variant="caption">{appDescription}</Typography>
      </CardContent>
      <CardActions
        sx={{
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <Buttons orientation="vertical" />
      </CardActions>
    </Card>
  );
};

export default Tile;
