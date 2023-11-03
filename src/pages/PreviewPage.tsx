// src/pages/PreviewPage.tsx

import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import NotificationForm from '../components/NotificationForm/NotificationForm';
import NotificationPreview from '../components/NotificationPreview';
import { useLocation, useParams } from 'react-router-dom';

const PreviewPage: React.FC = () => {
  // Get eventId from URL
  const { eventId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    templatebody: '',
  });

  const { state } = useLocation();

  const handleFormChange = (newData: typeof formData) => {
    setFormData(newData);
  };

  return (
    <>
      <Container
        style={{ marginTop: '20px', padding: '20px', minHeight: '85vh' }}
      >
        <Grid container spacing={6}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Paper elevation={16}>
              <h1 style={{ textAlign: 'center', padding: '20px' }}>
                Notification Add/Edit
              </h1>
              <NotificationForm
                onChange={handleFormChange}
                eventId={eventId}
                applicationId={state?.applicationId}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Paper elevation={16}>
              <h1 style={{ textAlign: 'center', padding: '20px' }}>Preview</h1>
              <NotificationPreview formData={formData} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PreviewPage;
