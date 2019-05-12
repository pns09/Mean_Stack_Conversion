const config = require('../config/config')
const mongoose = require('mongoose')

mongoose.connect(config.development.url,{useNewUrlParser: true })
    .then(res => {
        console.log('DB Connected')
    })
    .catch(err => {
        console.log('DB Not Connected')
    })

    