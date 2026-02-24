const { validationResult } = require("express-validator");

function validateFields(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validacion fallida",
      errors: errors.array()
    });
  }
  next();
}

module.exports = { validateFields };