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
  const messageEndRef = useRef(null);
  const location = useLocation();
  const user = location.state.patient ? location.state.patient : location.state.doctor;

  useEffect(() => {
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
    };
  }, [user]);

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
      // setMessages((prev) => [...prev, message]); // Commented out to prevent duplicate messages
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

  return (
    <div className="min-h-screen bg-[#F0F2F5] p-6">
      <div className="flex h-[calc(100vh-180px)] bg-white rounded-lg shadow-md overflow-hidden">
        <div className="w-1/4 bg-gray-100 p-4 border-r">
          <h2 className="text-xl font-bold mb-4 text-[#30336B]">Contacts</          h2>
          {contacts.length === 0 ? (
            <p className="text-gray-500 text-sm">No contacts available</p>
          ) : (
            <ul className="space-y-2">
              {contacts.map((contact) => (
                <li
                  key={contact.id}
                  className={`p-3 rounded-md cursor-pointer transition-colors ${
                    selectedContact?.id === contact.id 
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
                    const isCurrentUser = msg.sender === user.id;
                    return (
                      <div key={index} className={`mb-4 flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] p-3 rounded-lg ${
                          isCurrentUser ? 'bg-[#30336B] text-white' : 'bg-gray-200 text-black'
                        }`}>
                          <p>{msg.content}</p>
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
                  You can view and send messages to your contacts
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
