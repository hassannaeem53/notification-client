import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/'; // Replace with your actual API base URL

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
    const response = await axios.post(
      `${API_BASE_URL}api/notifications`,
      notificationData
    );

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
