const express = require('express');
const router = express.Router();
const { generateText } = require('../controllers/textGenController');
const { requireAuth } = require('../middleware/authMiddleware');

router.post('/generate-text', requireAuth, generateText);

module.exports = router; 