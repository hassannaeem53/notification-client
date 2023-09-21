import { useState } from 'react';
// import axios from 'axios';
import apiClient from '../services/apiClient';

interface NotificationData {
  name: string;
  description: string;
  templatebody: string;
  templatesubject: string;
  eventId?: string;
}

interface NotificationStatus {
  error: string | null;
  loading: boolean;
  success: boolean;
}

const useCreateNotification = (): {
  createNotification: (notificationData: NotificationData) => Promise<void>;
  status: NotificationStatus;
} => {
  const [status, setStatus] = useState<NotificationStatus>({
    error: null,
    loading: false,
    success: false,
  });

  const createNotification = async (
    notificationData: NotificationData,
    edit: boolean
  ) => {
    setStatus((prevStatus) => ({ ...prevStatus, loading: true }));

    try {
      let response;
      if (edit) {
        const { eventId, ...editData } = notificationData;
        // console.log(
        //   '🚀 ~ file: useCreateNotification.ts:40 ~ editData:',
        //   editData
        // );
        response = await apiClient.patch(`/notifications/${eventId}`, editData);
      } else
        response = await apiClient.post('/notifications', notificationData);

      if (response.status === 201 || response.status === 200) {
        // Notification created successfully
        setStatus({ error: null, loading: false, success: true });
      } else {
        setStatus({
          error: `Failed to create notification: ${response.status}`,
          loading: false,
          success: false,
        });
      }
    } catch (error) {
      setStatus({
        error: `Error creating notification: ${error.response.data.message}`,
        loading: false,
        success: false,
      });
    }
  };
  console.log('🚀 ~ file: useCreateNotification.ts:50 ~ status:', status);
  return { createNotification, status };
};

export default useCreateNotification;
