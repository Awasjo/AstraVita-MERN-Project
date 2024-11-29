import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './doctorPortal.css';

const DoctorNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/notifications', { withCredentials: true });
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

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
      // Remove the notification from the state after handling
      setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
    } catch (error) {
      console.error('Error handling permission request:', error);
    }
  };

  return (
    <div className="doctor-container">
      <h2 className="notification-title">Notifications</h2>
      <div className="notification-list">
        {notifications.length === 0 ? (
          <p>No new notifications.</p>
        ) : (
          notifications.map((notification) => (
            <div key={notification._id} className="notification-item">
              <p>{notification.message}</p>
              <span className="notification-date">{new Date(notification.createdDate).toLocaleDateString()}</span>
              <div className="notification-actions">
                {notification.type === 'requesting-permission' && (
                  <>
                    <button
                      className="accept-button"
                      onClick={() => handlePermission(notification._id, notification.sender, 'approve')}
                    >
                      Accept
                    </button>
                    <button
                      className="reject-button"
                      onClick={() => handlePermission(notification._id, notification.sender, 'decline')}
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorNotifications;
