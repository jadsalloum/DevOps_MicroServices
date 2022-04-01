//https://www.youtube.com/watch?v=bxsemcrY4gQ 
//https://www.geeksforgeeks.org/login-form-using-node-js-and-mongodb/


//npm install express
//npm install express-http-proxy
//npm install mongoose
//npm install morgan
//npm install ejs
//npm install body-parser --save
//npm install jsonwebtoken

const express = require('express'); 
const proxy = require('express-http-proxy'); 

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use("/login",proxy('http://authentication.default.svc.cluster.local:3001'));
app.use("/patients",proxy('http://patients.default.svc.cluster.local:3002'));
app.use("/Appointments",proxy('http://appointments.default.svc.cluster.local:3003'));
app.use("/Users",proxy('http://users.default.svc.cluster.local:3004'));

/*
app.use("/login",proxy('http://localhost:3001'));
app.use("/patients",proxy('http://localhost:3002'));
app.use("/Appointments",proxy('http://localhost:3003'));
app.use("/Users",proxy('http://localhost:3004'));
*/
/*
app.use("/login",proxy('http://authentication:3001'));
app.use("/patients",proxy('http://patients:3002'));
app.use("/Appointments",proxy('http://appointments:3003'));
app.use("/Users",proxy('http://users:3004'));
*/

app.listen(3333, () => console.log('Gateway is listening on port 3333.....test1 '));

/*

const morgan = require('morgan');
app.use(morgan('dev'));

const mongoose = require('mongoose');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const dotenv = require("dotenv");
dotenv.config();

// import the model
const Patients = require('./models/patients');
const Users = require('./models/users');




const dbURI = process.env.connectionstring;
//'mongodb+srv://js2028:123Joelle@cluster0.45ukv.mongodb.net/MedicalCenter?retryWrites=true&w=majority';


mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) =>  app.listen(3333)) //console.log('Connected to MongoDB');
    .catch((err) => console.log(err));



app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));


// mangoose and mongodb interactions

// routes

const login_route = require("./routes/login_functions");
const patient_routes = require("./routes/patients_functions");
const user_routes = require("./routes/users_functions");
const verifyuser_routes = require("./routes/verifyuser.js");
const appointments_routes = require("./routes/appointments_functions.js");

app.use("/login", login_route);
app.use("/patients",verifyuser_routes, patient_routes);
app.use("/Users",verifyuser_routes,  user_routes);
app.use("/Appointments",verifyuser_routes,  appointments_routes);


console.log('waiting.....');

// http://localhost:3333/patients/all 
*/