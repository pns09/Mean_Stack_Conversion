const messagemodel = require('../../models/message');


let saveMessage = (req, res) => {
    const messageDoc = messagemodel(req.body)

    messageDoc.save().then((data) => {
        res.json(data)
    }).catch((err) => {
        res.status(500).send(err)
    })
}
module.exports.saveMessage = saveMessage;

let getAllMessages = function (req, res) {
    console.log('I received a show all message GET request');
    messagemodel.find({}, function (err, data) {
        if (!err) {
            res.send(data);
        }
        else {
            console.log('error')
        }
    });
}

module.exports.getAllMessages = getAllMessages;

let deleteMessage = function (req, res) {
    
    messagemodel.findByIdAndRemove(req.params.id).then(function (res) {
         res.status(204).send('deleted successfully');
    }).catch(err => res.send(err));
}



module.exports.deleteMessage = deleteMessage;
