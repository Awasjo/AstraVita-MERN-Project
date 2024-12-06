import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    <div className="min-h-screen bg-[#F0F2F5]">
      <div className="ml-0 md:ml-[80px] relative p-4 md:p-0">
        <div className="max-w-[1440px] mx-auto relative">
          {/* Title */}
          <div className="md:absolute md:left-[80px] md:top-[107px] mb-6 md:mb-0">
            <h2 className="text-[24px] md:text-[28px] font-bold text-[#30336B] font-inter leading-[34px]">
              Notifications
            </h2>
          </div>

          {/* Notifications List */}
          <div className="mt-8 space-y-2 md:absolute md:left-[80px] md:top-[180px] w-full md:w-[1080px]">
            {notifications.length === 0 ? (
              <div className="bg-white rounded-md p-6 text-center text-gray-500">
                No new notifications.
              </div>
            ) : (
              notifications.map((notification) => (
                <div 
                  key={notification._id} 
                  className="relative w-full md:w-[1080px] min-h-[80px] md:h-[80px] bg-white 
                    shadow-[0px_2px_4px_rgba(0,0,0,0.1)] rounded-md flex flex-col md:flex-row 
                    items-start md:items-center p-4 md:p-5"
                >
                  {/* Profile Picture */}
                  <div className="w-[48px] h-[48px] rounded-full bg-[#D9DAE4] overflow-hidden flex-shrink-0">
                    <img
                      src={notification.profilePicture || "/external/profile-picture-default.png"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Message and Date */}
                  <div className="ml-4 flex-grow max-w-[600px] md:max-w-none">
                    <p className="text-[14px] md:text-[16px] font-semibold text-[#222222] leading-[19px] break-words">
                      {notification.message}
                    </p>
                    <div className="mt-2">
                      {notification.type === 'requesting-permission' && (
                        <span className="text-[12px] md:text-[14px] font-bold text-[#E67E22] leading-[17px] mr-2">
                          NEW •
                        </span>
                      )}
                      <span className="text-[12px] md:text-[14px] font-medium text-[#666666] leading-[17px]">
                        {new Date(notification.createdDate).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-row gap-2 mt-4 md:mt-0 ml-0 md:ml-auto w-full md:w-auto">
                    {notification.type === 'test-result' && (
                      <button
                        onClick={() => handleViewTestResult(notification)}
                        className="flex-1 md:flex-none md:w-[100px] h-[40px] bg-[#30336B] text-white 
                          rounded-md hover:bg-[#282B59] transition-colors text-[14px] md:text-[16px] 
                          font-semibold"
                      >
                        View
                      </button>
                    )}
                    {notification.type === 'requesting-permission' && (
                      <>
                        <button
                          onClick={() => handlePermission(notification._id, notification.sender, 'approve')}
                          className="flex-1 md:flex-none md:w-[100px] h-[40px] bg-[#30336B] text-white 
                            rounded-md hover:bg-[#282B59] transition-colors text-[14px] md:text-[16px] 
                            font-semibold"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handlePermission(notification._id, notification.sender, 'decline')}
                          className="flex-1 md:flex-none md:w-[100px] h-[40px] bg-[#C7C7D7] text-[#30336B] 
                            rounded-md hover:bg-[#B8B8C9] transition-colors text-[14px] md:text-[16px] 
                            font-semibold"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {notification.type !== 'requesting-permission' && (
                      <button
                        onClick={() => handleDelete(notification._id)}
                        className="flex-1 md:flex-none md:w-[100px] h-[40px] bg-[#C7C7D7] text-[#30336B] 
                          rounded-md hover:bg-[#B8B8C9] transition-colors text-[14px] md:text-[16px] 
                          font-semibold"
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
      </div>
    </div>
  );
};

export default DoctorNotifications;
