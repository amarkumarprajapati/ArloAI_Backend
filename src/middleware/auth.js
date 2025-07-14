const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwt: jwtCfg } = require('../config');

async function createUser(email, password) {
  if (await User.exists({ email })) {
    throw new Error('Email already in use');
  }
  const user = await User.create({ email, password });
  const token = jwt.sign(
    { id: user._id, email: user.email },
    jwtCfg.secret,
    { expiresIn: jwtCfg.expiresIn }
  );

  return token;
}

module.exports = { createUser };
