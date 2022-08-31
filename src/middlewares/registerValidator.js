const {check} = require('express-validator');

module.exports = [
    check('nombre')
        .notEmpty().withMessage('El nombre es requerido').bail(),
    check('color')
        .notEmpty().withMessage('El color es requerido').bail(),
    check('email')
        .notEmpty().withMessage('El email es requerido').bail()
        .isEmail().withMessage('El email no es valido'),
];