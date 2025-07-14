const userService = require('../services/userService');
const User = require('../models/User');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const userAuth = {};


userAuth.signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already in use' });
    }
    const newUser = await User.create({ email, password });
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET || 'defaultsecret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );
    res.status(201).json({
      message: 'User created successfully',
      token,
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};



userAuth.signIn = async (req, res) => {
  try {
    const email = String(req.body.email || '').trim();
    const password = String(req.body.password || '').trim();

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });


    if (!user || String(user.password) !== password) {

      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'defaultsecret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );


    return res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};







module.exports = userAuth;
