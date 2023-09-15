
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import Buttons from "../common/Buttons/Buttons";
import { AxiosError } from "axios";
import { App } from "../services/appService";
import useModifyData from "../hooks/useModifyData";

interface Props {
  app: App;
  selectedApp: string | undefined;
  setSelectedApp: (app: string | undefined) => void;
  // onDelete: (id: number) => void;
  openToast: (err: AxiosError) => void;
  closeToast: () => void;
  open: boolean;
  toastError: string | undefined;
  page: number;
  onEdit: () => void;
  onSetName: (name: string) => void;
  setPage: (page: number) => void;
  finalPage: number;
}

const Tile = ({
  app,
  selectedApp,
  setSelectedApp,
  open,
  openToast,
  closeToast,
  // onDelete,
  page,
  toastError,
  onSetName,
  setPage,
  finalPage,
}: Props) => {
  return (
    <Card
      elevation={12}
      sx={{
        padding: 1,
        backgroundColor: '#EEEEEE',
        borderRadius: 4,
        display: 'flex',
        minHeight: '15vw',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '90%',
        border: selectedApp === app._id ? '3px solid #2196F3' : 'none', // Set the border style based on the condition
        '&:hover': {
          border: '3px solid #2196F3', // Define the hover effect here
        },
        cursor: 'pointer',
        position: 'relative', // Added position relative for absolute positioning
      }}
      onClick={() => {
        setSelectedApp(app._id);
        onSetName(app.name);
      }}
    >
      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          textAlign: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant='h5'
          component='div' // You can set this to 'h1' or 'h2' as needed
          sx={{
            color: '#303030',
          }}
          style={{
            fontWeight: selectedApp === app._id ? 'bold' : 'normal', // Set the font weight based on the condition
            fontSize: selectedApp === app._id ? '1.7rem' : '1.5rem', // Set the font size based on the condition
          }}
        >
          {app.name.toUpperCase()}
        </Typography>
        <hr
          style={{
            width: '100%',
            height: '1px',
            backgroundColor: '#303030',
          }}
        />

        <Typography variant='body1'>{app.description}</Typography>
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '40px',
            }}
          >
            <Typography
              variant='caption'
              sx={{ color: '#777', paddingRight: '50px' }}
            >
              Created: 2021-10-01
            </Typography>

            <Typography variant='caption' sx={{ color: '#777' }}>
              Updated: 2021-10-01
            </Typography>
          </div>
        </div>
      </CardContent>
      <CardActions>
        <Buttons
          selectedEntity={app}
          isActive={app.is_active}
          openToast={openToast}
          closeToast={closeToast}
          open={open}
          page={page}
          error={toastError}
          entity="applications"
          setPage={setPage}
          finalPage={finalPage}
          setSelectedApp={setSelectedApp} //to ensure that events & ntoifications of deleted app dont appear
        />
      </CardActions>
    </Card>
  );
};

export default Tile;
