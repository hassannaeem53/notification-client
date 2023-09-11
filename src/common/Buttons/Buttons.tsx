import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, ButtonGroup, IconButton, Switch } from '@mui/material';
import { useTheme, ThemeProvider } from '@mui/material/styles';

interface Props {
  orientation?: 'horizontal' | 'vertical';
}

const Buttons = ({ orientation = 'horizontal' }: Props) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const styles = {
    backgroundColor: isDarkMode ? '#333333' : '#EEEEEE',
    borderRadius: 2,
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <ButtonGroup
          size='medium'
          aria-label='medium button group'
          orientation={orientation}
          sx={styles}
        >
          <Switch
            checked={true}
            onClick={() => console.log('switch toggled')}
            color='primary'
          />
          <IconButton color='inherit'>
            <EditIcon color='action' />
          </IconButton>

          <IconButton color='inherit'>
            <DeleteIcon color='error' />
          </IconButton>
        </ButtonGroup>
      </Box>
    </ThemeProvider>
  );
};

export default Buttons;
