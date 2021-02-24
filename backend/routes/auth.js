const { Router } = require('express');
const express = require('express');
const router = express.Router();
const {signup, signin, signout, requireSignin, forgotPassword, resetPassword} = require('../controllers/auth');

//validatord 
const {runValidation} = require('../validators/index');
const {userSignupValidator, userSigninValidator, forgotPasswordValidator, resetPasswordValidator} = require('../validators/auth');


router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/signin', userSigninValidator, runValidation, signin);
router.get('/signout', signout);
router.put('/forgot-password', forgotPasswordValidator, runValidation, forgotPassword);
router.put('/reset-password', resetPasswordValidator, runValidation, resetPassword);

module.exports = router;




