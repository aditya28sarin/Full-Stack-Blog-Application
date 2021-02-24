require('dotenv').config();
const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const cors = require('cors')
// bring routes
const blogRoutes = require('./routes/blog');
const authRoutes =require('./routes/auth');
const userRoutes =require('./routes/user');
const categoryRoutes =require('./routes/category');
const tagRoutes =require('./routes/tag');

// Create app
const app = express();
app.use(cors());

// db connect
mongoose
    .connect(process.env.DB_URL, {useNewUrlParser: true, useCreateIndex:true, useFindAndModify:false, useUnifiedTopology:true})
    .then(() => {
        console.log("Connected to MongoDB");
    }).catch(error => {console.log(error)});

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(cookieParser());


//middleware routes
app.use('/api',blogRoutes);
app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',tagRoutes);


//cors
// if(process.env.NODE_ENV === 'development'){
//     app.use(cors({origin: `${process.env.CLIENT_URL}`}));
// }



// Port
const port = process.env.PORT || 8000;
app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});
