const mongoose = require("mongoose");

const sequenceSchema = mongoose.Schema({
  maxDocumentId: { type: Number },
  maxMessageId: { type: Number },
  maxContactId: { type: Number },
});

const sequence = mongoose.model("Sequence", sequenceSchema);

module.exports = sequence;

// Example item from Mongo database
/*
  {
    _id: ObjectId('66908b0be57672329ae8e3ee'),
    maxDocumentId: 100,
    maxMessageId: 101,
    maxContactId: 101
  }
*/
