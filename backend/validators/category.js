const {check} = require('express-validator');

exports.CategoryCreateValidator = [
    check('name')
    .not()
    .isEmpty()
    .withMessage('Name is required'),
];
