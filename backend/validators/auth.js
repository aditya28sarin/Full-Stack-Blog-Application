const {check} = require('express-validator');

//we specify these checks for the some fields that are mentioned below and also what checks to be done
//if one is not fulfilled then we will send this message with an error that will be specified as error
exports.userSignupValidator = [
    check('name')
    .not()
    .isEmpty()
    .withMessage('Name is required'),

    check('email')
    .isEmail()
    .withMessage('Must be a valid e-mail address'),

    
    check('password')
    .isLength({min: 6})
    .withMessage('Password must be atleast 6 characters long'),

];

exports.userSigninValidator = [

    check('email')
    .isEmail()
    .withMessage('Must be a valid e-mail address'),

    
    check('password')
    .isLength({min: 6})
    .withMessage('Password must be atleast 6 characters long'),

];



exports.forgotPasswordValidator = [
    check('email')
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('Must be a valid email address')
];

exports.resetPasswordValidator = [
    check('newPassword')
        .not()
        .isEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
];
