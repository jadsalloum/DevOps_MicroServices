const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    firstName:{ type:String, required: false },
    lastName:{ type:String, required: false },
    email:{ type:String, required: false },
    dateOfBirth:{ type:String, required: false },
    //knowndiseases:{ type:String, required: false },
    phone:{ type:String, required: false },
    country:{ type:String, required: false },
    city:{ type:String, required: false },
    address:{ type:String, required: false },
    emergencyContact:{ type:String, required: false },
    emergencyContactPhone:{ type:String, required: false },
    insuranceProvider:{ type:String, required: false },
    insurancePolicyNumber:{ type:String, required: false }
});

const Patients = mongoose.model('Patients', patientSchema);
module.exports = Patients;
