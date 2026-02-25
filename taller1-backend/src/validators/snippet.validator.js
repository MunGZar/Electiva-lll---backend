const { body } = require('express-validator');

const snippetValidator = [
    body('title')
        .notEmpty().withMessage('El título es obligatorio')
        .isLength({ min: 3 }).withMessage('El título debe tener al menos 3 caracteres'),
    body('language')
        .notEmpty().withMessage('El lenguaje es obligatorio'),
    body('code')
        .notEmpty().withMessage('El contenido del código es obligatorio'),
    body('tags')
        .optional()
        .isArray().withMessage('Tags debe ser un array de strings')
];

module.exports = { snippetValidator };
