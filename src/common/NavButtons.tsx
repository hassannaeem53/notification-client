import { Grid, IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ButtonGroup } from "react-bootstrap";

interface Props {
  currentPage: number;
  totalPages: number | undefined;
  setPage: (page: number) => void;
}

const NavButtons = ({ currentPage = 1, totalPages = 1, setPage }: Props) => {
  const prevPage = () => setPage(currentPage - 1);

  const nextPage = () => setPage(currentPage + 1);

  return (
    <Grid
      item
      xs={12}
      sx={{
        textAlign: "center",
      }}
    >
      <ButtonGroup>
        <IconButton onClick={prevPage} disabled={currentPage === 1}>
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton onClick={nextPage} disabled={currentPage === totalPages}>
          <ArrowForwardIosIcon />
        </IconButton>
      </ButtonGroup>
    </Grid>
  );
};

export default NavButtons;
