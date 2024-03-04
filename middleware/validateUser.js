// middleware/validateUser.js
const { body, validationResult } = require('express-validator');

const validarAutenticacion = [
  body('dni')
    .notEmpty()
    .isNumeric()
    .isLength({ min: 8 })
    .withMessage('Ingrese un DNI válido'),
  body('clave')
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage('Ingrese una clave válida'),
];

const handleErrorValidations = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.json({
      ok: false,
      error: 'Error de validación',
      errores: errores.array(),
    });
  }
  next();
};

module.exports = { validarAutenticacion, handleErrorValidations };
