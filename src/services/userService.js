const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function createUser(email, password) {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email already in use');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();
  return user;
}

async function authenticateUser(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
}

module.exports = { createUser, authenticateUser }; 