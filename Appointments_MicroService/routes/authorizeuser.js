//const Users = require('../models/users');

const authorize_access = (req, res, data) => {
    if(data=="Patient")
    {
    if(req.user.role == "Doctor" || req.user.role == "Nurse" || req.user.role == "Clerk" || req.user.role == "Paramedic" )
    {
        return true;
    }else {return false;}
}
else if (data == "Lab" || data == "Treatment" )
{
    if(req.user.role == "Doctor" || req.user.role == "Nurse" || req.user.role == "Paramedic" )
    {
        return true;
    }else {return false;}
}else if (data == "Registration")
{
    if(req.user.role == "Clerk" || req.user.role == "Nurse")
    {
        return true;
    }else {return false;}
}else if (data == "RegisterPatient")
{
    if(req.user.role == "Clerk" )
    {
        return true;
    }else {return false;}
}else if (data == "ManageUsers")
{
    console.log("Current user Role : " + req.user.role)
    if(req.user.role == "Admin" )
    {
        return true;
    }else {return false;}
}
else if (data == "AdmittoWard")
{
    console.log("Current user Role : " + req.user.role)
    if(req.user.role == "Doctor" )
    {
        return true;
    }else {return false;}
}
};


module.exports = authorize_access;
