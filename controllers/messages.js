// Imports
const Messages = require('../models/dbMessages');

// Exports
exports.newMessage = (req, res, next) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send('new message created: \n' + data);
    }
  });
};
