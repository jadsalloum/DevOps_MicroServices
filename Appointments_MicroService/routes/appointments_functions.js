const router = require("express").Router();
// import the model
const Appointment = require('../models/appointments');
const authorize_access = require('./authorizeuser');

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

const _ObjectID = require('mongodb').ObjectID;   

// add Appointment
router.post('/add',jsonParser, (req, res) => {
    if(!authorize_access(req, res, "RegisterPatient") )
    {res.status(401).json({ error: 'Unauthorized, you do not have permissions to access this page....' })}

    const appointment = new Appointment({
        patientID:req.body.patientID,
        doctorID:req.body.doctorID,
        date_time:req.body.date_time,
        duration:req.body.duration,
        symptoms:req.body.symptoms
    });
    appointment.save()
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
    //res.send('Patient added');

});

    // get all patients appointments
router.get('/all', async (req, res) => {
    if(!authorize_access(req, res, "RegisterPatient") )
    {res.status(401).json({ error: 'Unauthorized, you do not have permissions to access this page....' })}

    await Appointment.find()

    .then((result) => res.send(result))
    .catch((err) => console.log(err));

    });

// get Appointment by id
router.get('/id/:id', async (req, res) => {
    if(!authorize_access(req, res, "RegisterPatient") )
    {res.status(401).json({ error: 'Unauthorized, you do not have permissions to access this page....' })}
    
    var pid = new _ObjectID(req.params.id);

    console.log("ID of Patient = " + pid);
    
    let result = await Appointment.findById(pid);
    if(result || result.length > 0)
    {res.send(result)}
    else
    {res.status(404).json({ error: 'Appointment not found' })}
    });

// Update Appointment by id
router.post('/update', jsonParser, async (req, res) => {
    if(!authorize_access(req, res, "RegisterPatient") )
    {res.status(401).json({ error: 'Unauthorized, you do not have permissions to access this page....' })}
    
    //const appointment = new Appointment({patientID:req.body.patientID});
    
    var pid = new _ObjectID(req.body._id);

    console.log("ID of Patient = " + pid);
    
    let result = await Appointment.findByIdAndUpdate(pid,{doctorID:req.body.doctorID, date_time:req.body.date_time,duration:req.body.duration,symptoms:req.body.symptoms});
    if(result || result.length > 0)
    {res.send("Appointment updated Successfully")}
    else
    {res.status(404).json({ error: 'Error Occured, Appointment not found' })}
    });

    // Delete Appointment by id
router.post('/delete', jsonParser, async (req, res) => {
    if(!authorize_access(req, res, "RegisterPatient") )
    {res.status(401).json({ error: 'Unauthorized, you do not have permissions to access this page....' })}
    
    var pid = new _ObjectID(req.body._id);

    console.log("ID of Patient = " + pid);
    
    let result = await Appointment.findByIdAndDelete(pid);
    if(result || result.length > 0)
    {res.send("Appointment Deleted Successfully")}
    else
    {res.status(404).json({ error: 'Error Occured, Appointment not found' })}
    });

    // get Appointment by patinet id
router.get('/patientid/:id', async (req, res) => {
    if(!authorize_access(req, res, "Patient") )
    {res.status(401).json({ error: 'Unauthorized, you do not have permissions to access this page....' })}
    
    var pid = new _ObjectID(req.params.id);

    console.log("ID of Patient = " + pid);
    
    let result = await Appointment.find({"patientID":pid});
    if(result || result.length > 0)
    {res.send(result)}
    else
    {res.status(404).json({ error: 'Appointment not found' })}

    });



    router.get('/doctorid/:id', async (req, res) => {
        if(!authorize_access(req, res, "Patient") )
        {res.status(401).json({ error: 'Unauthorized, you do not have permissions to access this page....' })}
        
        var pid = new _ObjectID(req.params.id);
    
        console.log("ID of Doctor = " + pid);
        
        let result = await Appointment.find({"doctorID":pid});
        if(result || result.length > 0)
        {res.send(result)}
        else
        {res.status(404).json({ error: 'Doctor has no appointments' })}
    
        });


module.exports = router ;