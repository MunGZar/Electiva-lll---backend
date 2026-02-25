const User = require('../models/Users');
const asyncHandler = require('../utils/asyncHandler');
const jwt = require('jsonwebtoken');

// @desc    Registrar usuario
// @route   POST /api/v1/auth/register
// @access  Public
const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password
    });

    sendTokenResponse(user, 201, res);
});

// @desc    Login de usuario
// @route   POST /api/v1/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Por favor proporcione un email y contraseña'
        });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({
            success: false,
            message: 'Credenciales inválidas'
        });
    }

    sendTokenResponse(user, 200, res);
});

// Helper para generar token y enviar respuesta
const sendTokenResponse = (user, statusCode, res) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'MI LLAVE SECRETA PARA JWT', {
        expiresIn: process.env.JWT_EXPIRES_IN || '30d'
    });

    res.status(statusCode).json({
        success: true,
        token
    });
};

module.exports = {
    register,
    login
};
