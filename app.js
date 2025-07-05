require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('ArloAI Backend is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
