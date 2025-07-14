require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/auth');
const textGenRoutes = require('./src/routes/textGenRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();


app.get('/', (req, res) => {
  res.send('ArloAI Backend is running');
});






// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', textGenRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('ArloAI Backend is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
