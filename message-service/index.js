const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
require('dotenv').config();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('./config/passport');

const messageRoutes = require('./routes/message.route');

const app = express();
const server = http.createServer(app);
const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];

//only port 5173 is allowed to access the messaging service during dev
const io = socketIo(server, { cors: { origin: allowedOrigins } }); 
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
  }
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Messaging service connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('send_message', (data) => {
    io.to(data.recipient).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

app.use('/api/messages', messageRoutes);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Messaging service running on port ${PORT}`);
});
