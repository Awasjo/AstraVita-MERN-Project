// components/Messaging.jsx
import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { useLocation } from "react-router-dom";

const socket = io('http://localhost:3001');

const Messaging = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showContactsList, setShowContactsList] = useState(true);
  const messageEndRef = useRef(null);
  const location = useLocation();
  const user = location.state.patient ? location.state.patient : location.state.doctor;

  useEffect(() => {
    // Check if on mobile and a contact is selected
    const handleResize = () => {
      if (window.innerWidth < 768 && selectedContact) {
        setShowContactsList(false);
      } else {
        setShowContactsList(true);
      }
    };

    // Initial check
    handleResize();

    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Fetch contacts
    const fetchContacts = async () => {
      try {
        const response = user.role === 'Patient'
          ? await axios.get('http://localhost:3000/api/users/patients/doctors', { withCredentials: true })
          : await axios.get('http://localhost:3000/api/users/doctors/patients', { withCredentials: true });
        setContacts(response.data);
      } catch (error) {
        console.error('Failed to fetch contacts:', error);
      }
    };

    fetchContacts();

    // Listen for incoming messages
    socket.on('receive_message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('receive_message');
      window.removeEventListener('resize', handleResize);
    };
  }, [user, selectedContact]);

  useEffect(() => {
    if (selectedContact) {
      // Join the room for the selected contact
      socket.emit('join_room', { userId: user.id, contactId: selectedContact.id });
      
      // Fetch existing messages for the selected contact
      const fetchMessages = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/messages/${user.id}/${selectedContact.id}`, { withCredentials: true });
          setMessages(response.data.messages);
        } catch (error) {
          console.error('Failed to fetch messages:', error);
        }
      };

      fetchMessages();
      
      // On mobile, hide the contacts list when a contact is selected
      if (window.innerWidth < 768) {
        setShowContactsList(false);
      }
    }
  }, [selectedContact, user.id]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedContact) return;

    const message = {
      sender: user.id,
      receiver: selectedContact.id,
      content: newMessage,
    };

    try {
      await axios.post('http://localhost:3001/api/messages/send', message);
      socket.emit('send_message', message);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleBackToContacts = () => {
    setShowContactsList(true);
  };

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
    if (window.innerWidth < 768) {
      setShowContactsList(false);
    }
  };

  return (
    <div className="bg-[#F0F2F5] p-2 sm:p-4 md:p-6 h-full">
      <div className="flex flex-col md:flex-row h-[calc(100vh-3rem)] md:h-[calc(100vh-3.5rem)] bg-white rounded-lg shadow-md overflow-hidden">
        {/* Contacts list - will be hidden on mobile when a contact is selected */}
        <div className={`${
          showContactsList ? 'flex' : 'hidden'
        } md:flex md:w-1/4 w-full flex-col bg-gray-100 p-3 md:p-4 border-r transition-all duration-300 ease-in-out`}>
          <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-[#30336B]">Contacts</h2>
          {contacts.length === 0 ? (
            <p className="text-gray-500 text-sm">No contacts available</p>
          ) : (
            <ul className="space-y-2 overflow-y-auto">
              {contacts.map((contact) => (
                <li
                  key={contact.id}
                  className={`p-3 rounded-md cursor-pointer transition-colors ${
                    selectedContact?.id === contact.id 
                      ? 'bg-[#30336B] text-white' 
                      : 'bg-white text-[#222222] hover:bg-gray-200'
                  }`}
                  onClick={() => handleSelectContact(contact)}
                >
                  <div className="font-medium truncate">
                    {contact.role === 'Doctor' ? 'Dr. ' : ''}{contact.firstName} {contact.lastName}
                  </div>
                  <div className="text-xs opacity-75 truncate">
                    {contact.role === 'Doctor' ? contact.specialty || 'Doctor' : 'Patient'}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Messages area */}
        <div className={`${
          !showContactsList ? 'flex' : 'hidden'
        } md:flex md:w-3/4 w-full flex-col transition-all duration-300 ease-in-out`}>
          {selectedContact ? (
            <>
              {/* Contact header */}
              <div className="p-3 md:p-4 bg-gray-50 border-b flex items-center">
                {/* Back button for mobile */}
                <button 
                  onClick={handleBackToContacts}
                  className="mr-2 md:hidden text-[#30336B] hover:text-[#282B59]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#D9DAE4] mr-2 md:mr-3 flex-shrink-0"></div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold truncate">
                    {selectedContact.role === 'Doctor' ? 'Dr. ' : ''}{selectedContact.firstName} {selectedContact.lastName}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 truncate">
                    {selectedContact.role === 'Doctor' ? selectedContact.specialty || 'Doctor' : 'Patient'}
                  </p>
                </div>
              </div>
              
              {/* Messages area - Add pb-16 on mobile for input spacing */}
              <div className="flex-1 p-3 md:p-4 pb-20 md:pb-4 overflow-y-auto bg-gray-50">
                {messages.length === 0 ? (
                  <div className="text-center py-6 md:py-10 text-gray-500">
                    <p>No messages yet in this conversation.</p>
                    <p className="text-xs md:text-sm mt-2">Start a conversation by sending a message below.</p>
                  </div>
                ) : (
                  messages.map((msg, index) => {
                    const isCurrentUser = msg.sender === user.id;
                    return (
                      <div key={index} className={`mb-3 md:mb-4 flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] md:max-w-[70%] p-2.5 md:p-3 rounded-lg ${
                          isCurrentUser ? 'bg-[#30336B] text-white' : 'bg-gray-200 text-black'
                        }`}>
                          <p className="break-words">{msg.content}</p>
                          <div className={`text-xs mt-1 ${isCurrentUser ? 'text-blue-200' : 'text-gray-500'}`}>
                            {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messageEndRef}></div>
              </div>
              
              {/* Message input - Fixed at bottom on mobile */}
              <div className="p-2 md:p-4 bg-white border-t md:relative fixed bottom-0 left-0 right-0 md:left-auto md:bottom-auto md:right-auto">
                <div className="flex max-w-full md:max-w-none mx-auto md:mx-0 w-[calc(100%-1rem)] md:w-full">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#30336B] text-sm md:text-base"
                  />
                  <button 
                    onClick={sendMessage} 
                    className="px-3 md:px-4 py-2 bg-[#30336B] text-white rounded-r-md hover:bg-[#282B59] transition-colors text-sm md:text-base"
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            // No selected contact - Universal placeholder with SVG
            <div className="flex-1 flex items-center justify-center bg-gray-50 p-4">
              <div className="text-center p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <p className="text-xl text-gray-500 mb-2">Select a contact to start messaging</p>
                <p className="text-sm text-gray-400">
                  Your conversations will appear here
                </p>
                <button 
                  onClick={handleBackToContacts}
                  className="mt-4 px-4 py-2 bg-[#30336B] text-white rounded-md hover:bg-[#282B59] transition-colors md:hidden"
                >
                  View Contacts
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messaging;
