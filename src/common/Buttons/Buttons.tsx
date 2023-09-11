import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, ButtonGroup, IconButton, Switch } from '@mui/material';
import { useState } from 'react';
import { AxiosError } from 'axios';
import useDeleteApp from '../../hooks/useDeleteApp';
import FormModal from '../FormModal';
import { App } from '../../hooks/useApps';
import useModifyApp from '../../hooks/useModifyApp';

interface Props {
  selectedApp: App;
  isActive: boolean;
  openToast: (err: AxiosError) => void;
  closeToast: () => void;
  open: boolean;
  // onDelete: (id: number) => void;
  error: string | undefined;
  page: number;
  // onEdit: () => void;
}

const styles = { backgroundColor: '#BABABA', borderRadius: 2 };

const Buttons = ({ selectedApp, isActive, page }: Props) => {
  const [checked, setChecked] = useState(isActive);
  const [open, setOpen] = useState<boolean>(false);

  const deleteApp = useModifyApp(page, () => setChecked(false));
  const onDelete = () => {
    deleteApp.mutate({ id: selectedApp._id, entity: { is_deleted: true } });
  };

  const toggleApp = useModifyApp(page, () => setChecked(!checked));
  const onToggle = () => {
    const updatedEntity = { is_active: !checked };
    toggleApp.mutate({ id: selectedApp._id, entity: updatedEntity });
  };

  const onEdit = () => setOpen(true);

  return (
    <>
      <Box>
        <ButtonGroup size='medium' aria-label='medium button group' sx={styles}>
          <Switch checked={checked} onClick={onToggle} color='primary' />

          <IconButton color='inherit' onClick={onEdit}>
            <EditIcon color='action' />
          </IconButton>

          <IconButton color='inherit' onClick={onDelete}>
            <DeleteIcon color='error' />
          </IconButton>
        </ButtonGroup>
      </Box>
      <FormModal
        open={open}
        setOpen={setOpen}
        title='Edit'
        app={selectedApp}
        page={page}
      />
    </>
  );
};

export default Buttons;
