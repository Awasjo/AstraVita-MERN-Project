// components/Messaging.jsx
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { useLocation } from "react-router-dom";


const socket = io('http://localhost:3001');

const Messaging = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messageEndRef = useRef(null);
  const location = useLocation();
  const user = location.state.patient ? location.state.patient : location.state.doctor;
  console.log('User in Messaging:', user); //user in context

  useEffect(() => {
    // Fetch existing messages
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/messages/${user.id}`, { withCredentials: true });
        // console.log('Messages from response:', response.data.messages); //Messages form the database
        setMessages(response.data.messages);
        // console.log('Messages from setMessages:', messages);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();

    // Listen for incoming messages
    socket.on('receive_message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, [user]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const message = {
      sender: user.id,
      receiver: '67255f467406d79956391313', //this is awasd user - temporary
      content: newMessage,
    };

    console.log('Message to send:', message);

    try {
      await axios.post('http://localhost:3001/api/messages/send', message);
      socket.emit('send_message', message);
      setMessages((prev) => [...prev, message]);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div>
      <div style={{ overflowY: 'auto', maxHeight: '300px' }}>
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === user._id ? 'sent' : 'received'}>
            <p>{msg.content}</p>
          </div>
        ))}
        <div ref={messageEndRef}></div>
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Messaging;
