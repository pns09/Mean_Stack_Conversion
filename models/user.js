const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    "username": {
        type: String,
        trim: true,
        required: [true, 'Username missing']
    },

    "password": {
        type: String,
        trim: true,
        required: [true, 'Password missing']
    },
    "fname": {
        type: String,
        trim: true,
        required: [true, 'First name missing']
    },
    "Lname": {
        type: String,
        trim: true,
        required: [true, 'Last name missing']
    },
    "phone": {
        type: String,
        trim: true,
        required: [true, 'phone missing']
    },

})


const userModel = mongoose.model('userCollection', userSchema);
module.exports = userModel;