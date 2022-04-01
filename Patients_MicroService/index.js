//https://www.youtube.com/watch?v=bxsemcrY4gQ 
//https://www.geeksforgeeks.org/login-form-using-node-js-and-mongodb/


//npm install express
//npm install mongoose
//npm install morgan
//npm install ejs
//npm install body-parser --save
//npm install jsonwebtoken
//npm install dotenv

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
    .then((result) =>  app.listen(3002)) //console.log('Connected to MongoDB');
    .catch((err) => console.log(err));



app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));


// mangoose and mongodb interactions

// routes
const patient_routes = require("./routes/patients_functions");
const verifyuser_routes = require("./routes/verifyuser.js");

app.use("/",verifyuser_routes, patient_routes);


console.log('Patients Service ! Waiting..... New2');


