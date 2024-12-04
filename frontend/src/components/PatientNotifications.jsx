import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PatientNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/notifications', { withCredentials: true });
        console.log('Notifications:', response.data);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleViewTestResult = async (notification) => {
    try {
      const receiverResponse = await axios.get(`/api/users/${notification.receiver}`);
      const senderResponse = await axios.get(`/api/users/${notification.sender}`);
      
      const receiver = receiverResponse.data;
      const sender = senderResponse.data;

      const patient = receiver.role === 'Patient' ? receiver : sender.role === 'Patient' ? sender : null;
      if (!patient) {
        console.error('Neither receiver nor sender is a patient');
        return;
      }

      const testResultId = notification.testResult;
      navigate(`/patient`, { state: { patient: patient, testResultId: testResultId } });
    } catch (error) {
      console.error('Error determining patient ID:', error);
    }
  };

  const handlePermission = async (notificationId, requesterId, action) => {
    try {
      // Use the handle-permission-request route to approve or decline the request
      await axios.post(
        '/api/users/handle-permission-request',
        {
          requesterId,
          action
        },
        { withCredentials: true }
      );
      await axios.delete(`/api/notifications/${notificationId}`, { withCredentials: true });
      // Remove the notification from the state after handling
      setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
      console.log('Notification handled successfully');
    } catch (error) {
      console.error('Error handling permission request:', error);
    }
  };

  const handleDelete = async (notificationId) => {
    try {
      await axios.delete(`/api/notifications/${notificationId}`, { withCredentials: true });
      setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  return (
    <div>
      <h2>Notifications</h2>
      <div>
        {notifications.length === 0 ? (
          <p>No new notifications.</p>
        ) : (
          notifications.map((notification) => (
            <div key={notification._id} >
              <p>{notification.message}</p>
              <span >{new Date(notification.createdDate).toLocaleDateString()}</span>
              <div >
              {notification.type === 'test-result' && (
                  <button
                    onClick={ () => handleViewTestResult(notification) }
                  >
                    View
                  </button>
                )}
                {notification.type === 'requesting-permission' && (
                  <>
                    <button
                      onClick={() => handlePermission(notification._id, notification.sender, 'approve')}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handlePermission(notification._id, notification.sender, 'decline')}
                    >
                      Reject
                    </button>
                  </>
                )}
                {notification.type !== 'requesting-permission' && (
                  <button
                    onClick={() => handleDelete(notification._id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PatientNotifications;
