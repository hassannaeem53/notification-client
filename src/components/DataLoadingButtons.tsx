import { Box, ButtonGroup, Switch, IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const DataLoadingButtons = () => {
  return (
    <Box>
      <ButtonGroup size="medium" aria-label="medium button group">
        <Switch
          checked={true}
          onClick={() => console.log("switch toggled")}
          color="primary"
        />
        <IconButton color="inherit">
          <ArrowForwardIosIcon color="action" />
        </IconButton>

        <IconButton color="inherit">
          <ArrowForwardIosIcon color="error" />
        </IconButton>
      </ButtonGroup>
    </Box>
  );
};

export default DataLoadingButtons;
