// Import the Sequence model
var sequence = require("../models/sequence");

let Sequence = sequence;

let maxDocumentId;
let maxMessageId;
let maxContactId;
let sequenceId = null;

function SequenceGenerator() {
  Sequence.findOne()
    .then((sequence) => {
      sequenceId = sequence._id;
      maxDocumentId = sequence.maxDocumentId;
      maxMessageId = sequence.maxMessageId;
      maxContactId = sequence.maxContactId;

      console.log(">> SERVER:SEQUENCEGENERATOR:FINDONE:sequence: ", sequence);
    })
    .catch((err) => {
      console.error(err);
      // return null;
    });
}

SequenceGenerator.prototype.nextId = function (collectionType) {
  let updateObject = {};
  let nextId;

  switch (collectionType.toLowerCase()) {
    case "documents":
      maxDocumentId++;
      updateObject = { maxDocumentId: maxDocumentId };
      nextId = maxDocumentId;
      break;
    case "messages":
      maxMessageId++;
      updateObject = { maxMessageId: maxMessageId };
      nextId = maxMessageId;
      break;
    case "contacts":
      maxContactId++;
      updateObject = { maxContactId: maxContactId };
      nextId = maxContactId;
      break;
    default:
      return -1;
  }

  Sequence.updateOne({ _id: sequenceId }, { $set: updateObject }).catch(
    (err) => {
      console.log("nextId error = " + err);
      return null;
    }
  );

  console.log(">> SERVER:SEQUENCEGENERATOR:nextId: ", nextId);
  return nextId;
};

// Export an instance of the SequenceGenerator
module.exports = new SequenceGenerator();
