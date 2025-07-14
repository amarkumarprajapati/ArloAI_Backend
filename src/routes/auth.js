const express = require('express');
const router = express.Router();
const userAuth = require('../controllers/authController');

router.post('/signup', userAuth.signUp);
router.post('/signin', userAuth.signIn);

module.exports = router; 