var express = require('express');
var router = express.Router();


const usercontroller = require('./user.controller')

router.post('/save_user',usercontroller.saveUser)

router.get('/getallusers', usercontroller.getAllUsers);

module.exports = router;


   
    