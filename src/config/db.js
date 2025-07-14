const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

let MONGODB_URI = "mongodb://localhost:27017/arloai";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.set('debug', true);

    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
