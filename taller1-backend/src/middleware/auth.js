const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const asyncHandler = require('../utils/asyncHandler');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No está autorizado para acceder a esta ruta'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'MI LLAVE SECRETA PARA JWT');
        req.user = await User.findById(decoded.id);

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Token no válido o expirado'
        });
    }
});

module.exports = { protect };
