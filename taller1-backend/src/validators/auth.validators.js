const { body } = require("express-validator");

const registerValidator = [
    body("email").isEmail().withMessage("El email no es valido").normalizeEmail(),
    body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
    body("name").notEmpty().withMessage("El nombre es obligatorio").isString().withMessage("El nombre deben de ser letras")
];

const loginValidator = [
    body("email").isEmail().withMessage("El email no es valido").normalizeEmail(),
    body("password").notEmpty().withMessage("Password requerida")
];

module.exports = { registerValidator, loginValidator };