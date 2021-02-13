const {check} = require('express-validator');

exports.TagCreateValidator = [
    check('name')
    .not()
    .isEmpty()
    .withMessage('Name is required'),
];
