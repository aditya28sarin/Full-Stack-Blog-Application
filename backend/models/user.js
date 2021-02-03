const mongoose = require('mongoose')
const crypto = require('crypto')


const userSchema =  new mongoose.Schema({

    username: {
        type: String, 
        trim:true,  //we will trim any whitespaces 
        required:true,
        max:32,
        unique: true,
        index:true, //we will make a lot of DB queries based on the suername and hence we want to make it indexable 
        lowercase:true
    },

    name: {
        type: String, 
        trim:true, 
        required:true,
        max:32,
    },

    email: {
        type: String, 
        trim:true, 
        required:true,
        unique:true,
        lowercase:true
    },

    profile: {
        type: String, 
        required: true,
    },

    hashed_password: {
        type: String, 
        required: true
    },

    salt: String, 
    
    about: {
        type: String
    },

    role: {
        type: Number,
        trim: true
    },

    photo: {
        data: Buffer, // we are going to save the photo as a binary format in the DB 
        contentType: String
    },

    resetPasswordLink: {
        data: String,
        default: ''
    }
}, {timestamp:true});


module.exports = mongoose.model('User', userSchema);