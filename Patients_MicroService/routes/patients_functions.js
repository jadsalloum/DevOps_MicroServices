const router = require("express").Router();
// import the model
const Patients = require('../models/patients');
const Treatment = require('../models/treatment');
const authorize_access = require('./authorizeuser');

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

const _ObjectID = require('mongodb').ObjectID;   

// add patient
router.post('/register',jsonParser, (req, res) => {
    if(!authorize_access(req, res, "RegisterPatient") )
    {res.status(401).json({ error: 'Unauthorized, you do not have permissions to access this page....' })}

    const patient = new Patients({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        dateOfBirth: req.body.dateOfBirth,
        phone: req.body.phone,
        country: req.body.country,
        city: req.body.city,
        address: req.body.address,
        emergencyContact: req.body.emergencyContact,
        emergencyContactPhone: req.body.emergencyContactPhone,
        insuranceProvider: req.body.insuranceProvider,
        insurancePolicyNumber: req.body.insurancePolicyNumber
    });
    patient.save()
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
    //res.send('Patient added');

});


// get all patients
router.get('/all', async (req, res) => {
    if(!authorize_access(req, res, "Patient") )
    {res.status(401).json({ error: 'Unauthorized, you do not have permissions to access this page....' })}

    await Patients.find()

    .then((result) => res.send(result))
    .catch((err) => console.log(err));

    });

// get patient by id
router.get('/id/:id', async (req, res) => {
    if(!authorize_access(req, res, "Patient") )
    {res.status(401).json({ error: 'Unauthorized, you do not have permissions to access this page....' })}
    
    var pid = new _ObjectID(req.params.id);

    console.log("ID of Patient = " + pid);
    
    let result = await Patients.findById(pid);
    console.log("result = " + result);
    console.log("result length = "  + result.length);
    if(result || result.length > 0)
    {res.send(result)}
    else
    {res.status(404).json({ error: 'Patient not found' })}

    });


// get patient by name
router.get('/name/:name', async (req, res) => {
    if(!authorize_access(req, res, "Patient") )
    {res.status(401).json({ error: 'Unauthorized, you do not have permissions to access this page....' })}
    
    var pname = req.params.name;

    console.log("name of Patient = " + pname);
    
    let result = await Patients.find({ firstName: pname  });
    console.log("result = " + result);
    if( result.length > 0)
    {res.send(result)}
    else
    {res.status(404).json({ error: 'Patient not found' })}

    });

    // Update Patinet Details by id
router.post('/update', jsonParser, async (req, res) => {
    if(!authorize_access(req, res, "RegisterPatient") )
    {res.status(401).json({ error: 'Unauthorized, you do not have permissions to access this page....' })}
    
    var pid = new _ObjectID(req.body._id);

    console.log("ID of Patient = " + pid);
    
    let result = await Patients.findByIdAndUpdate(pid,{
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        dateOfBirth: req.body.dateOfBirth,
        phone: req.body.phone,
        country: req.body.country,
        city: req.body.city,
        address: req.body.address,
        emergencyContact: req.body.emergencyContact,
        emergencyContactPhone: req.body.emergencyContactPhone,
        insuranceProvider: req.body.insuranceProvider,
        insurancePolicyNumber: req.body.insurancePolicyNumber
    });
    if(result || result.length > 0)
    {res.send("Patient Details updated Successfully")}
    else
    {res.status(404).json({ error: 'Error Occured, Patient not found' })}
    });

    // Delete Patient by id
router.post('/delete', jsonParser, async (req, res) => {
    if(!authorize_access(req, res, "RegisterPatient") )
    {res.status(401).json({ error: 'Unauthorized, you do not have permissions to access this page....' })}
    
    var pid = new _ObjectID(req.body._id);

    console.log("ID of Patient = " + pid);
    
    let result = await Patients.findByIdAndDelete(pid);
    if(result || result.length > 0)
    {res.send("Patient Deleted Successfully")}
    else
    {res.status(404).json({ error: 'Error Occured, Patient not found' })}
    });

// add Treatment
router.post('/treatment',jsonParser, (req, res) => {
    if(!authorize_access(req, res, "Treatment") )
    {res.status(401).json({ error: 'Unauthorized, you do not have permissions to access this page....' })}

    const treatment = new Treatment({
        patientID:req.body.patientID,
        doctorId:req.body.doctorId,
        servicepoint:req.body.servicepoint,
        treatment_datetime:req.body.treatment_datetime,
        symptoms:req.body.symptoms,
        doctor_referraldetails:req.body.doctor_referraldetails,
        doctor_additionaldiseases :req.body.doctor_additionaldiseases,
        medicines:req.body.medicines
    });
    treatment.save()
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
    //res.send('Patient added');
});


// get All Treatments for paithent by id
router.get('/id/:id/treatment', async (req, res) => {
    if(!authorize_access(req, res, "Patient") )
    {res.status(401).json({ error: 'Unauthorized, you do not have permissions to access this page....' })}
    
    var pid = new _ObjectID(req.params.id);

    console.log("ID of Patient = " + pid);
    
    let result = await Treatment.find({"patientID":pid});
    console.log("result = " + result);
    console.log("result length = "  + result.length);
    if(result || result.length > 0)
    {res.send(result)}
    else
    {res.status(404).json({ error: 'Patient not found' })}

    });




module.exports = router ;