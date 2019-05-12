const usermodel = require('../../models/user')


let saveUser = (req, res) => {
    const userDoc = usermodel(req.body)

    userDoc.save().then((data) => {
        res.json(data)
    }).catch((err) => {
        res.status(500).send(err)
    })
}

let getAllUsers = function (req, res) {
    console.log('I received a GET request');
    usermodel.find({}, function(err, users) {
        if(!err){
            res.send(users);
        }
        else{
            console.log('error')
        }
    });

}

module.exports.saveUser = saveUser;
module.exports.getAllUsers = getAllUsers;

