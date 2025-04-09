// components/Messaging.jsx
import React, { useState, useEffect, useRef, useContext } from 'react';
import { useLocation } from "react-router-dom";
import { AuthContext } from './AuthContext';
import { mockDoctors, mockPatients, mockMessages } from '../mockData';
import { toast } from 'react-toastify';

const Messaging = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const messageEndRef = useRef(null);
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const currentUser = location.state?.patient || location.state?.doctor || user;
  const [showDemoHint, setShowDemoHint] = useState(true);

  useEffect(() => {
    // Get contacts based on user role from mock data
    if (currentUser.role === 'Patient') {
      const doctorContacts = mockDoctors.filter(doctor => 
        currentUser.doctors && currentUser.doctors.includes(doctor.id || doctor._id)
      );
      setContacts(doctorContacts);
    } else if (currentUser.role === 'Doctor') {
      const patientContacts = mockPatients.filter(patient => 
        patient.doctors && patient.doctors.includes(currentUser.id || currentUser._id)
      );
      setContacts(patientContacts);
    }
  }, [currentUser]);

  useEffect(() => {
    if (selectedContact) {
      // Get conversation key based on IDs
      const conversation1 = `${currentUser.id || currentUser._id}_${selectedContact.id || selectedContact._id}`;
      const conversation2 = `${selectedContact.id || selectedContact._id}_${currentUser.id || currentUser._id}`;
      
      // Check both possible conversation keys in mock messages
      const conversationMessages = mockMessages[conversation1] || mockMessages[conversation2] || [];
      
      setMessages(conversationMessages);
    }
  }, [selectedContact, currentUser]);

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return;

    const message = {
      sender: currentUser.id || currentUser._id,
      receiver: selectedContact.id || selectedContact._id,
      content: newMessage,
      timestamp: new Date().toISOString()
    };

    // Add message to current conversation (in memory only for demo)
    setMessages(prev => [...prev, message]);
    setNewMessage('');
    toast.success("Message sent in demo mode");
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-[#F0F2F5] p-6">
      {showDemoHint && (
        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-6 relative">
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
                <span className="font-bold">DEMO MODE:</span> This messaging interface works with sample data.
              </p>
              <ul className="mt-2 list-disc list-inside text-sm text-blue-700">
                <li>Select a contact to view sample conversations</li>
                <li>You can type and "send" messages that will appear in the demo</li>
                <li>Messages you send will not persist after refreshing the page</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="flex h-[calc(100vh-180px)] bg-white rounded-lg shadow-md overflow-hidden">
        <div className="w-1/4 bg-gray-100 p-4 border-r">
          <h2 className="text-xl font-bold mb-4 text-[#30336B]">Contacts</h2>
          {contacts.length === 0 ? (
            <p className="text-gray-500 text-sm">No contacts available in demo mode</p>
          ) : (
            <ul className="space-y-2">
              {contacts.map((contact) => (
                <li
                  key={contact.id || contact._id}
                  className={`p-3 rounded-md cursor-pointer transition-colors ${
                    selectedContact && (selectedContact.id === contact.id || selectedContact._id === contact._id) 
                      ? 'bg-[#30336B] text-white' 
                      : 'bg-white text-[#222222] hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="font-medium">
                    {contact.role === 'Doctor' ? 'Dr. ' : ''}{contact.firstName} {contact.lastName}
                  </div>
                  <div className="text-xs opacity-75">
                    {contact.role === 'Doctor' ? contact.specialty || 'Doctor' : 'Patient'}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="w-3/4 flex flex-col">
          {selectedContact ? (
            <>
              {/* Contact header */}
              <div className="p-4 bg-gray-50 border-b flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#D9DAE4] mr-3"></div>
                <div>
                  <h3 className="font-bold">
                    {selectedContact.role === 'Doctor' ? 'Dr. ' : ''}{selectedContact.firstName} {selectedContact.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedContact.role === 'Doctor' ? selectedContact.specialty || 'Doctor' : 'Patient'}
                  </p>
                </div>
              </div>
              
              {/* Messages area */}
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                {messages.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">
                    <p>No messages yet in this conversation.</p>
                    <p className="text-sm mt-2">Start a conversation by sending a message below.</p>
                  </div>
                ) : (
                  messages.map((msg, index) => {
                    const isCurrentUser = msg.sender === (currentUser.id || currentUser._id);
                    return (
                      <div key={index} className={`mb-4 flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] p-3 rounded-lg ${
                          isCurrentUser ? 'bg-[#30336B] text-white' : 'bg-gray-200 text-black'
                        }`}>
                          <p>{msg.content}</p>
                          <div className={`text-xs mt-1 ${isCurrentUser ? 'text-blue-200' : 'text-gray-500'}`}>
                            {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messageEndRef}></div>
              </div>
              
              {/* Message input */}
              <div className="p-4 bg-white border-t">
                <div className="flex">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#30336B]"
                  />
                  <button 
                    onClick={sendMessage} 
                    className="px-4 py-2 bg-[#30336B] text-white rounded-r-md hover:bg-[#282B59] transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <p className="text-xl text-gray-500 mb-2">Select a contact to start messaging</p>
                <p className="text-sm text-gray-400">
                  In this demo, you can view and send sample messages to your contacts
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messaging;
