const {body } = require("express-validatora");

const registerValidator =[
    body("email").isEmail().withMessage("El email no es valido").normalizeEmail(),
    body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
    body("name").optional().isString().withMessage("El nombre deben de ser letras")
];
const loginValidator = [
    body("email").isEmail().withMessage("El email no es valido").normalizeEmail(),
    body("password").isString().withMessage("Password requerida")
];
module.exports = { registerValidator };