import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './patientPortal.css';

const PatientNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Fetch notifications specifically for the patient
        const response = await axios.get('http://localhost:3000/api/notifications/patient', { withCredentials: true });
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleViewTestResult = (testResultId) => {
    // Navigate to the test result page with the testResultId for the patient
    navigate(`/patient/test-result`, { state: { testResultId } });
  };

  const handleAcceptDoctor = async (notificationId) => {
    try {
      await axios.post(`http://localhost:3000/api/notifications/${notificationId}/accept`);
      // Remove the accepted notification
      setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
    } catch (error) {
      console.error('Error accepting doctor:', error);
    }
  };

  const handleRejectDoctor = async (notificationId) => {
    try {
      await axios.post(`http://localhost:3000/api/notifications/${notificationId}/reject`);
      // Remove the rejected notification
      setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
    } catch (error) {
      console.error('Error rejecting doctor:', error);
    }
  };

  return (
    <div className="patient-container">
      <h2 className="notification-title">Notifications</h2>
      <div className="notification-list">
        {notifications.length === 0 ? (
          <p>No new notifications.</p>
        ) : (
          notifications.map((notification) => (
            <div key={notification._id} className="notification-item">
              <p>{notification.message}</p>
              <span className="notification-date">{new Date(notification.date).toLocaleDateString()}</span>
              <div className="notification-actions">
                {notification.type === 'test-result' && (
                  <button
                    className="view-button"
                    onClick={() => handleViewTestResult(notification.testResultId)}
                  >
                    View
                  </button>
                )}
                {notification.type === 'requesting-permission' && (
                  <>
                    <button
                      className="accept-button"
                      onClick={() => handleAcceptDoctor(notification._id)}
                    >
                      Accept
                    </button>
                    <button
                      className="reject-button"
                      onClick={() => handleRejectDoctor(notification._id)}
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

export default PatientNotifications;
