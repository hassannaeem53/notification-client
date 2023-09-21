import axios from 'axios';
import apiClient from './apiClient';

// Create a function to send a POST request to create a notification

interface NotificationData {
  name: string;
  description: string;
  templatebody: string;
  eventId?: string;
}

const createNotification = async (notificationData: NotificationData) => {
  try {
    notificationData.eventId = '64e5b480047e075f9012e089';
    const response = await apiClient.post('/notifications', notificationData);

    if (response.status === 201) {
      // Notification created successfully
      console.log('Notification created:', response.data);
    } else {
      console.error(
        'Failed to create notification:',
        response.status,
        response.data
      );
    }
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};

export default createNotification;
