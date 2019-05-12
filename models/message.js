const mongoose = require('mongoose');

const messageScehma = mongoose.Schema({
    sender:{
        type:String,
        required:true,
        trim:true

    },
    message:{
        type:String,
        required:true,
        trim:true
    },
    receiver:{
        type:String,
        required:true,
        trim:true
    },
    important:{
        type:String,
        required:true,
        trim:true
    }
})
const messageModel = mongoose.model('messageCollection',messageScehma)
module.exports = messageModel;