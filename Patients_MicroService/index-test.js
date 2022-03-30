///npm install -g mocha --save-dev
//npm i -D chai
//npm i -D chai-http 

// npm install -g chai-http --save-dev
// npm install -g chai-json-schema --save-dev
// npm install -g chai-things --save-dev
// npm install -g chai-as-promised --save-dev
// npm install -g chai-match --save-dev

const { assert, expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
let  server  = require("./routes/patients_functions");
const Patient = require('./models/patients.js');
//const patient_routes = require("./routes/patients_functions");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();


const jwt = require("jsonwebtoken");
//var bodyParser = require('body-parser')

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

//////////////////////

// Assertion Style
chai.should();
chai.use(chaiHttp);

let token = jwt.sign({
    _id: "62092a20267241184935ec21",
    username: "waleeja",
    role: "Nurse"
}, process.env.JWT_TOKEN_SECRET, { expiresIn: "24h" });

let token2 = jwt.sign({
    _id: "6209346eef2480e18f133628",
    username: "shaleeni",
    role: "Clerk"
}, process.env.JWT_TOKEN_SECRET, { expiresIn: "24h" });

console.log("Token for User = waleeja " + token);
console.log("Token for User = shaleeni " + token2);

describe("Testing Patients Microservice...", () => {
    it("Getting all patients info...", async () => {
        chai.request(server)
            .get('/all')
            .set({'auth-token' : token})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
            });
        }
    );

    it("Get patient by ID...", async () => {
        chai.request(server)
            .get('/id/620931cace5aa5392e4e3518')
            .set({'auth-token' : token})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
            });
        }
    );

    it("Get patient by First Name...", async () => {
        chai.request(server)
            .get('/name/mery')
            .set({'auth-token' : token})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
            });
        }
    );

    it("Get All Patient Treatments by ID...", async () => {
        chai.request(server)
            .get('/id/61fe907502cf49c6c3ee6e3b\treatment')
            .set({'auth-token' : token})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
            });
        }
    );

   

/*
    it("Registring new patient...",  (done) => {
        let patient = new Patient({
            firstName:"testpatient",
            lastName:"test familyname",
            email:"test@hotmail.com111",
            dateOfBirth:"02/11/2005",
            phone:"+22222222222",
            country:"United Arab Emirates",
            city:"Dubai",
            address:"JVT",
            emergencyContact:"none",
            emergencyContactPhone:"0000222200",
            insuranceProvider:"none",
            insurancePolicyNumber:"00002220000"
        });
        chai.request(server)
            .post('/register')
            .send(patient)
            .set({'auth-token' : token2})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                //res.body.should.be.a('object');
            })
            done();
        }
    );
*/


});

    
    