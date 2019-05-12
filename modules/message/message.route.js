var express = require('express');
var router = express.Router();


const messagecontroller = require('./message.controller')

router.post('/save_message',messagecontroller.saveMessage)

router.get('/getallmessage', messagecontroller.getAllMessages);

router.delete('/delete/:id',messagecontroller.deleteMessage);

module.exports = router;
