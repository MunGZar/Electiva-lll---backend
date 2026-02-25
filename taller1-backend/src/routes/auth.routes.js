const express = require('express');
const { register, login } = require('../controllers/auth.controller');
const { registerValidator, loginValidator } = require('../validators/auth.validators');
const { validateFields } = require('../validators/validateFields');

const router = express.Router();

router.post('/register', registerValidator, validateFields, register);
router.post('/login', loginValidator, validateFields, login);

module.exports = router;
