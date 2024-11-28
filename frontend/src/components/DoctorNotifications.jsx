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
        const response = await axios.get('http://localhost:3000/api/notifications', { withCredentials: true });
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleViewTestResult = (patientId, testResultId) => {
    navigate(`/patient/${patientId}`, { state: { testResultId: testResultId } });
  };

  const handleAccept = async (notificationId) => {
    try {
      //this route doesn't exist, please use the handle permission routes here
      await axios.post(`http://localhost:3000/api/notifications/${notificationId}/accept`);
      setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleReject = async (notificationId) => {
    try {
      //this route doesn't exist, please use the handle permission routes here
      await axios.post(`http://localhost:3000/api/notifications/${notificationId}/reject`);
      setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
    } catch (error) {
      console.error('Error rejecting request:', error);
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
              <span className="notification-date">{ new Date(notification.date).toLocaleDateString() }</span>
              <div className="notification-actions">
                {notification.type === 'test-result' && (
                  <button
                    className="view-button"
                    onClick={ () => handleViewTestResult(notification.patientId, notification.testResultId) }
                  >
                    View
                  </button>
                )}
                {notification.type === 'requesting-permission' && (
                  <>
                    <button
                      className="accept-button"
                      onClick={ () => handleAccept(notification._id) }
                    >
                      Accept
                    </button>
                    <button
                      className="reject-button"
                      onClick={ () => handleReject(notification._id) }
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
