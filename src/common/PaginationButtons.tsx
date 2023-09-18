import { Grid, Pagination, Stack } from '@mui/material';

interface Props {
  currentPage: number;
  totalPages: number | undefined;
  setPage: (page: number) => void;
}

const PaginationButtons = ({
  currentPage = 1,
  totalPages = 1,
  setPage,
}: Props) => {
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Grid
      item
      xs={12}
      sx={{
        textAlign: 'center',
      }}
    >
      <Stack
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleChange}
          color='primary'
        />
      </Stack>
    </Grid>
  );
};

export default PaginationButtons;
