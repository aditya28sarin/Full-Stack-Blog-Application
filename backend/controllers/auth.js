const User = require('../models/user');
const shortId = require('shortid'); //used to generate random user id when a user signs up 
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt'); //this will help to check if the JWT has expired or is it still valid?

exports.signup = (req,res) => {

    User.findOne({email:req.body.email}).exec((err,user) => {
        if(user){
            return res.status(400).json({
                error: 'Email is taken'
            })
        }

        const {name,email,password} = req.body;
        let username = shortId.generate();
        let profile = `${process.env.CLIENT_URL}/profile/${username}`;

        let newUser = new User({name, email, password, profile, username})
        newUser.save((err,success)=>{
            if(err){
                return res.status(400).json({
                    error:err
                })
            }
            // res.json({
            //     user:success
            // })
            res.json({
                message: 'SignUp Success! Please SignIn.'
            })
        });
    })
};

exports.signin =(req,res) => {

    const {email, password} = req.body;
 
    User.findOne({email}).exec((err,user)=>{
        //check if user exists 
        if(err || !user){
            res.status(400).json({
                error: "User with that email does not exist. Please signUp"
            });
        }

        //authenticate
        if(!user.authenticate(password)){
            res.status(400).json({
                error: "Email and Password do not match."
            });
        }

        //generate a JSON web token that will have a userID and a secret 
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn:'1d'});
        res.cookie('token', token, {expiresIn:'1d'}); //we add the token in the cookie 
        const {_id, username, name, email, role} = user;
        return res.json({
            token, 
            user: {_id, username, name, email, role}
        })

    })
};


exports.signout = (req,res)=>{
    res.clearCookie("token") //when the user signsout we want to clear the cookie called "token"
    res.json({
        message: "Signout success."
    }) 
}

// this is our middleware and it will protect us against signed out users accessing pages that we want only signedin users to access
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth",
})