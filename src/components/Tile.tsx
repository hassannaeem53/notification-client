import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Switch,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Buttons from '../common/Buttons/Buttons';

interface Props {
  appName: string;
  appDescription?: string;
  active: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
}

const Tile = ({
  appName,
  appDescription,
  active,
  onEdit,
  onDelete,
  onToggle,
}: Props) => {
  return (
    <Card
      elevation={8}
      sx={{
        borderRadius: '12px',
        display: 'flex',
        minHeight: '150px',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        padding: '16px',
        transition: '0.3s',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <CardContent>
        <Typography variant='h6' sx={{ color: '#2196F3' }}>
          {appName}
        </Typography>
        <Typography variant='body2' sx={{ color: '#757575', marginTop: '8px' }}>
          {appDescription}
        </Typography>
      </CardContent>
      <CardActions sx={{ alignSelf: 'flex-end' }}>
        <Buttons />
      </CardActions>
    </Card>
  );
};

export default Tile;
