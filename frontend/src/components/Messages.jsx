// components/Messaging.jsx
import React, { useState, useEffect, useRef } from 'react';
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
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-100 p-4">
        <h2 className="text-xl font-bold mb-4">Contacts</h2>
        <ul>
          {contacts.map((contact) => (
            <li
              key={contact.id}
              className={`p-2 cursor-pointer ${selectedContact?.id === contact.id ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
              onClick={() => setSelectedContact(contact)}
            >
              {contact.firstName} {contact.lastName}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`mb-4 ${msg.sender === user.id ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-2 rounded-lg ${msg.sender === user.id ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
                <p>{msg.content}</p>
              </div>
            </div>
          ))}
          <div ref={messageEndRef}></div>
        </div>
        <div className="p-4 bg-gray-200">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="w-full p-2 border rounded"
          />
          <button onClick={sendMessage} className="mt-2 p-2 bg-blue-500 text-white rounded">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Messaging;
