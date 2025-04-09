import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockNotifications, mockPatients } from '../mockData';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [showDemoHint, setShowDemoHint] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // In demo mode, filter notifications for the current user
    if (user) {
      const userNotifications = mockNotifications.filter(
        notif => notif.receiver === user.id || notif.receiver === user._id
      );
      setNotifications(userNotifications);
    }
  }, [user]);

  const handleViewTestResult = (notification) => {
    // In demo mode, find the patient from our mock data
    const patient = mockPatients.find(
      p => p.id === notification.receiver || p._id === notification.receiver
    );
    
    if (patient) {
      navigate('/patient', { 
        state: { 
          patient: patient, 
          testResultId: notification.testResult 
        } 
      });
    } else {
      toast.error("Patient not found in demo data");
    }
  };

  const handlePermission = (notificationId, requesterId, action) => {
    // In demo mode, just remove the notification from state
    setNotifications(prev => prev.filter(n => n._id !== notificationId));
    
    if (action === 'approve') {
      toast.success("Request approved in demo mode");
    } else {
      toast.info("Request declined in demo mode");
    }
  };

  const handleDelete = (notificationId) => {
    // In demo mode, just remove the notification from state
    setNotifications(prev => prev.filter(n => n._id !== notificationId));
    toast.success("Notification deleted in demo mode");
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col items-center p-4">
      {showDemoHint && (
        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-6 relative w-full max-w-[1440px]">
          <button 
            className="absolute top-2 right-2 text-blue-500"
            onClick={() => setShowDemoHint(false)}
          >
            ×
          </button>
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-800">
                <span className="font-bold">DEMO MODE:</span> This page shows your notifications from sample data.
              </p>
              <ul className="mt-2 list-disc list-inside text-sm text-blue-700">
                <li>You can interact with notifications (approve, reject, delete)</li>
                <li>Changes will only persist for this session</li>
                <li>Test result notifications can be clicked to view the referenced test</li>
              </ul>
            </div>
          </div>
        </div>
      )}
      
      <div className="w-full max-w-[1440px]">
        {/* Title */}
        <h2 className="text-[24px] text-center md:text-left md:text-[28px] font-bold text-[#30336B] font-inter leading-[34px] mb-6">
          Notifications
        </h2>
        {/* Notifications List */}
        <div className="space-y-2">
          {notifications.length === 0 ? (
            <div className="bg-white rounded-md p-6 text-center text-gray-500">
              No new notifications.
            </div>
          ) : (
            notifications.map((notification) => (
              <div 
                key={notification._id} 
                className="w-full bg-white shadow-md rounded-md flex flex-col md:flex-row items-start md:items-center p-4 md:p-5"
              >
                {/* Profile Picture */}
                <div className="w-[48px] h-[48px] rounded-full bg-[#D9DAE4] overflow-hidden flex-shrink-0 hidden md:block">
                  <img
                    src={notification.profilePicture || "/external/profile-picture-default.png"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Message and Date */}
                <div className="ml-4 flex-grow">
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
                      className="flex-1 md:flex-none md:w-[100px] h-[40px] bg-[#30336B] text-white rounded-md hover:bg-[#282B59] transition-colors text-[14px] md:text-[16px] font-semibold"
                    >
                      View
                    </button>
                  )}
                  {notification.type === 'requesting-permission' && (
                    <>
                      <button
                        onClick={() => handlePermission(notification._id, notification.sender, 'approve')}
                        className="flex-1 md:flex-none md:w-[100px] h-[40px] bg-[#30336B] text-white rounded-md hover:bg-[#282B59] transition-colors text-[14px] md:text-[16px] font-semibold"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handlePermission(notification._id, notification.sender, 'decline')}
                        className="flex-1 md:flex-none md:w-[100px] h-[40px] bg-[#C7C7D7] text-[#30336B] rounded-md hover:bg-[#B8B8C9] transition-colors text-[14px] md:text-[16px] font-semibold"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {notification.type !== 'requesting-permission' && (
                    <button
                      onClick={() => handleDelete(notification._id)}
                      className="flex-1 md:flex-none md:w-[100px] h-[40px] bg-[#C7C7D7] text-[#30336B] rounded-md hover:bg-[#B8B8C9] transition-colors text-[14px] md:text-[16px] font-semibold"
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
  );
};

export default Notifications;
