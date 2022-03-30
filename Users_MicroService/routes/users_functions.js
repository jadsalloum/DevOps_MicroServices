const router = require("express").Router();
// import the model
const Users = require('../models/users');
const authorize_access = require('./authorizeuser');
const _ObjectID = require('mongodb').ObjectID;   


var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

// add user
router.post('/register',jsonParser, (req, res) => {
    if(!authorize_access(req, res, "ManageUsers") )
    {res.status(401).json({ error: 'Unauthorized, you do not have permissions to access this page....' })}
    else
    {console.log("User " + req.user.username);}

    if (!req.body.role in ["Doctor", "Nurse", "Clerk", "Admin"])
    {res.status(400).json({ error: 'Please check the ROLE you entered ....' })}

    console.log(req.body.username);
    console.log(req.body.password);
    console.log(req.body.firstName);
    console.log(req.body.lastName);
    console.log(req.body.role);
    

    const user = new Users({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city

    });
    user.save()
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
    //res.send('User added');

});

    // get all users
router.get('/all', (req, res) => {
    if(!authorize_access(req, res, "ManageUsers") )
    {res.status(401).json({ error: 'Unauthorized, you do not have permissions to access this page....' })}

    Users.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));

    });

    // get all Doctors
router.get('/all/Doctors', (req, res) => {
    if(!authorize_access(req, res, "Patient") )
    {res.status(401).json({ error: 'Unauthorized, you do not have permissions to access this page....' })}

    Users.find({role: "Doctor"}).select('firstName lastName role email phone address city')
    .then((result) => res.send(result))
    .catch((err) => console.log(err));

    });

// Delete User by id
router.post('/delete', jsonParser, async (req, res) => {
    if(!authorize_access(req, res, "ManageUsers") )
    {res.status(401).json({ error: 'Unauthorized, you do not have permissions to access this page....' })}
    
    var pid = new _ObjectID(req.body._id);

    console.log("ID of User = " + pid);
    
    let result = await Users.findByIdAndDelete(pid);
    if(result || result.length > 0)
    {res.send("User Deleted Successfully")}
    else
    {res.status(404).json({ error: 'Error Occured, User not found' })}
    });

module.exports = router ;