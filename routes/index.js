var express = require('express');
var router = express.Router();
const newUser = require('../modules/user/user.route')
const newMessage = require('../modules/message/message.route')


router.get('/', function (req, res, next) {
  res.render('app')
})

router.use('/user',newUser)
router.use('/message',newMessage)

module.exports = router;
