const express = require('express');
const router = express.Router();
const { signUp, signIn } = require('../controllers/authController');
const validate = require('../middleware/validate');
const { signUpSchema, signInSchema } = require('../validators/authValidator');

router.post('/signup', validate(signUpSchema), signUp);
router.post('/signin', validate(signInSchema), signIn);

module.exports = router; 