require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const apiRoutes = require('./src/routes/api');
const authRoutes = require('./src/routes/auth');

const app = express();

const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173', // Be explicit for cookies
  credentials: true, // Required for cookies
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/v1', apiRoutes);
app.use('/api/v1/auth', authRoutes);

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error. Please check if your IP is whitelisted in MongoDB Atlas.');
    console.error(err.message);
  });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
