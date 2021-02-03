const {validationResult} = require('express-validator');

//as this is a middleware we will also have 'next'
exports.runValidation = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({error: errors.array()[0].msg})
    }
    next();
}


