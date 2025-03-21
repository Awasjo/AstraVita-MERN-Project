const express = require('express');
const mongoose = require('mongoose');
const passport = require('./config/passport');
const session = require('express-session');
const userRoutes = require('./routes/user.route');
const testResultRoutes = require('./routes/test-result.route');
const notificationRoutes = require('./routes/notification.route');
const MongoStore = require('connect-mongo');

const authMiddleware = require('./middleware/auth.middleware');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();


const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173','http://localhost:4173', 'http://127.0.0.1:4173'];

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin); // Dynamically set allowed origin
    }
    res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200); // Handle preflight requests
    }
    next();
});


const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    store: MongoStore.create({ mongoUrl: mongoUri }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    httpOnly: true, 
    maxAge: 14 * 24 * 60 * 60 * 1000 // 14 day
}
}));

app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
// all frontend requests to the user controller should start with /api/users
app.use('/api/users', userRoutes);
app.use('/api/test-results', testResultRoutes);
app.use('/api/notifications', notificationRoutes);

app.use(authMiddleware.isAuthenticated);


// Simple route
app.get('/', (req, res) => {
    res.send('This API serves as backend to the AstraVita Frontend project');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
