import { IconButton, Tooltip, Typography, Box } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

interface Props {
  description: string;
  createdDate: string;
  updatedDate: string;
}

const InfoButton = ({ description, createdDate, updatedDate }: Props) => {
  return (
    <Tooltip
      title={
        <Box>
          <Typography variant="body1">{description}</Typography>
          <Typography variant="body2">Created: {createdDate}</Typography>
          <Typography variant="body2">Updated: {updatedDate}</Typography>
        </Box>
      }
      arrow
      // interactive // Allows interactions within the tooltip
    >
      <IconButton color="primary">
        <InfoIcon />
      </IconButton>
    </Tooltip>
  );
};

export default InfoButton;
