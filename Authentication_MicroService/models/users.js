const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{ type:String, required: true },
    password:{ type:String, required: true },
    role:{ type:String, required: true },
    firstName:{ type:String, required: false },
    lastName:{ type:String, required: false },
    email:{ type:String, required: false },
    phone:{ type:String, required: false },
    address:{ type:String, required: false },
    city:{ type:String, required: false }

});

const Users = mongoose.model('Users', userSchema);
module.exports = Users;
