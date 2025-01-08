const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
require('dotenv').config();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('./config/passport');
const rateLimit = require('express-rate-limit');

const messageRoutes = require('./routes/message.route');

const app = express();
const server = http.createServer(app);
const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];

//only port 5173 is allowed to access the messaging service during dev
const io = socketIo(server, { cors: { origin: allowedOrigins } }); 
app.set('socketio', io); //accessible to the router
const userSocketMap = {}; //map of incoming user id to socket id

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});
app.use(express.json());
app.use(session({
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    httpOnly: true,
    maxAge: 14 * 24 * 60 * 60 * 1000 // 14 days
  }
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Messaging service connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  // Register user socket based on userid
  socket.on('register', (userId) => {
    userSocketMap[userId] = socket.id;
    console.log('User registered:', userId, 'with socket ID:', socket.id);
  });

  socket.on('send_message', (data) => {
    console.log('Message Service Index.js io data on send message callback:', data);
    const recipientSocketId = userSocketMap[data.receiver];
    if (recipientSocketId) {
      io.to(recipientSocketId).emit('receive_message', data);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
    for (const userId in userSocketMap) {
      if (userSocketMap[userId] === socket.id) {
        delete userSocketMap[userId];
        break;
      }
    }
  });
});
const messageLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 request per 15 minutes
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/messages', messageLimiter, messageRoutes);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Messaging service running on port ${PORT}`);
});
