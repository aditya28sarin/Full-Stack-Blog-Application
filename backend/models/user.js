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
        default: 0
    },

    photo: {
        data: Buffer, // we are going to save the photo as a binary format in the DB 
        contentType: String
    },

    resetPasswordLink: {
        data: String,
        default: ''
    }
}, {timestamps:true});


userSchema.virtual('password')
.set(function(password){
    //create a temporary variable called _password

    this._password = password

    //generate a 'salt' used for hashing algo 

    this.salt = this.makeSalt()

    //encrypt password

    this.hashed_password = this.encryptPassword(password)
})
.get(function(){
    return this._password;
});


userSchema.methods = {

    //will be used during the user signin
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password;
    },


    encryptPassword: function(password){
        if(!password) return '';
        try{
           return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
        } catch(err){
            return '';
        }
    },

    makeSalt: function(){
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
};


module.exports = mongoose.model('User', userSchema);