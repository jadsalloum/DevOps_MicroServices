const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const treatmentSchema = new Schema({
    patientID:{ type:String, required: false },
    doctorId:{ type:String, required: true },
    servicepoint:{ type:String, required: false },
    treatment_datetime:{ type:String, required: false },
    symptoms:{ type:String, required: false },
    doctor_referraldetails:{ type:String, required: false },
    doctor_additionaldiseases :{ type:String, required: false },
    medicines:{ type:String, required: false },
});

const Treatment = mongoose.model('PatientTreatment', treatmentSchema);
module.exports = Treatment;
