const userService = require('../services/userService');

const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    await userService.createUser(email, password);
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    if (err.message === 'Email already in use') {
      return res.status(409).json({ error: err.message });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await userService.authenticateUser(email, password);
    res.json({ token });
  } catch (err) {
    if (err.message === 'Invalid credentials') {
      return res.status(401).json({ error: err.message });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { signUp, signIn }; 