import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, ButtonGroup, IconButton, Switch } from "@mui/material";

interface Props {
  orientation?: "horizontal" | "vertical";
}

const styles = { backgroundColor: "#BABABA", borderRadius: 2 };

const Buttons = ({ orientation = "horizontal" }: Props) => {
  return (
    <Box>
      <ButtonGroup
        size="medium"
        aria-label="medium button group"
        orientation={orientation}
        sx={styles}
      >
        <Switch
          checked={true}
          onClick={() => console.log("switch toggled")}
          color="primary"
        />
        <IconButton color="inherit">
          <EditIcon color="action" />
        </IconButton>

        <IconButton color="inherit">
          <DeleteIcon color="error" />
        </IconButton>
      </ButtonGroup>
    </Box>
  );
};

export default Buttons;
