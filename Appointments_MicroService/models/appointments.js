const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    patientID:{ type:String, required: false },
    doctorID:{ type:String, required: false },
    date_time:{ type:String, required: false },
    duration:{ type:Number, required: false },
    symptoms:{ type:String, required: false }
});

const Appointment = mongoose.model('Appointments', AppointmentSchema);
module.exports = Appointment;