import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/'; // Replace with your actual API base URL

interface NotificationData {
  name: string;
  description: string;
  templatebody: string;
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

  const createNotification = async (notificationData: NotificationData) => {
    setStatus((prevStatus) => ({ ...prevStatus, loading: true }));

    try {
      notificationData.eventId = '64e5b480047e075f9012e089';
      const response = await axios.post(
        `${API_BASE_URL}api/notifications`,
        notificationData
      );

      if (response.status === 201) {
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
        error: `Error creating notification: ${error.message}`,
        loading: false,
        success: false,
      });
    }
  };

  return { createNotification, status };
};

export default useCreateNotification;
