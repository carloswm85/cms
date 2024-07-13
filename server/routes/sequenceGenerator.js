// Import the Sequence model
var Sequence = require("../models/sequence");

// Initialize variables to hold the maximum IDs for different collections
var maxDocumentId;
var maxMessageId;
var maxContactId;
var sequenceId = null;

// Define the SequenceGenerator constructor function
function SequenceGenerator() {
  // Find a single Sequence document from the database
  Sequence.findOne().then((res,err, sequence) => {
    if (err) {
      // If there is an error, return a 500 status and an error message
      return res.status(500).json({
        title: "An error occurred",
        error: err,
      });
    }

     if (this.item === undefined) {
       return;
     }
    // If the Sequence document is found, set the initial values for IDs and sequenceId
    sequenceId = sequence._id;
    maxDocumentId = sequence.maxDocumentId;
    maxMessageId = sequence.maxMessageId;
    maxContactId = sequence.maxContactId;
  });
}

// Define the nextId method on the SequenceGenerator prototype
SequenceGenerator.prototype.nextId = function (collectionType) {
  var updateObject = {}; // Object to hold the field to update
  var nextId; // Variable to hold the next ID

  // Determine which collection type is being updated
  switch (collectionType) {
    case "documents":
      maxDocumentId++; // Increment the document ID
      updateObject = { maxDocumentId: maxDocumentId }; // Set the update object
      nextId = maxDocumentId; // Set the next ID
      break;
    case "messages":
      maxMessageId++; // Increment the message ID
      updateObject = { maxMessageId: maxMessageId }; // Set the update object
      nextId = maxMessageId; // Set the next ID
      break;
    case "contacts":
      maxContactId++; // Increment the contact ID
      updateObject = { maxContactId: maxContactId }; // Set the update object
      nextId = maxContactId; // Set the next ID
      break;
    default:
      return -1; // Return -1 if the collection type is not recognized
  }

  // Update the Sequence document in the database with the new maximum ID
  Sequence.update({ _id: sequenceId }, { $set: updateObject }, function (err) {
    if (err) {
      // Log the error if there is a problem with the update
      console.log("nextId error = " + err);
      return null; // Return null if there is an error
    }
  });

  return nextId; // Return the next ID
};

// Export an instance of the SequenceGenerator
module.exports = new SequenceGenerator();
