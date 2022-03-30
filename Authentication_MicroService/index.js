//https://www.youtube.com/watch?v=bxsemcrY4gQ 
//https://www.geeksforgeeks.org/login-form-using-node-js-and-mongodb/


//npm install express
//npm install mongoose
//npm install morgan
//npm install ejs
//npm install body-parser --save
//npm install jsonwebtoken

const express = require('express'); 

const morgan = require('morgan');

const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

// import the model
//const Patients = require('./models/patients');
//const Users = require('./models/users');



const app = express();
const dbURI = process.env.connectionstring;
//'mongodb+srv://js2028:123Joelle@cluster0.45ukv.mongodb.net/MedicalCenter?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) =>  app.listen(3001)) //console.log('Connected to MongoDB');
    .catch((err) => console.log(err));



app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));


console.log('Authentication Service ! Waiting...Once done you will receive notification');

// routes
const login_route = require("./routes/login_functions");

app.use("/", login_route);




