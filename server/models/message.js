const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  id: { type: String, required: true },
  subject: { type: String },
  msgText: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "Contact" },
});

module.exports = mongoose.model("Message", messageSchema);

// Frontend model
/* ../../src/app/messages/message.model */

// Example item from Mongo database
/*
{
  _id: ObjectId('66908b67e57672329ae8e3f0'),
  id: '101',
  subject: 'yourSubject',
  msgText: 'yourMessage',
  sender: ObjectId('66908b4be57672329ae8e3ef')
}
*/
