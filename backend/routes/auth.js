const { Router } = require('express');
const express = require('express');
const router = express.Router();
const {signup, signin, signout, requireSignin} = require('../controllers/auth');

//validatord 
const {runValidation} = require('../validators/index');
const {userSignupValidator, userSigninValidator} = require('../validators/auth');


router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/signin', userSigninValidator, runValidation, signin);
router.get('/signout', signout);


// router.get("/secret", requireSignin,(req,res)=>{
//     res.json({
//         user:req.auth
//     });
// })

module.exports = router;




