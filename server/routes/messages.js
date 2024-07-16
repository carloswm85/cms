// Importing express to create a router object for handling routes
var express = require("express");
var router = express.Router();

// Importing sequenceGenerator for generating sequence IDs
const sequenceGenerator = require("./sequenceGenerator");

// Importing the Message model to interact with the messages collection in MongoDB
const Message = require("../models/message");
const Contact = require("../models/contact");
const contact = require("../models/contact");

// ===================================================================== GET ALL
// Define a GET endpoint to fetch all messages
router.get("/", (req, res, next) => {
  Message.find() // Retrieve all messages from the collection
    .then((messages) => {
      // Respond with status 200 (OK) and send the messages as JSON
      res.status(200).json({
        message: "Messages fetched successfully from the MongoDB database!",
        messages: messages,
      });
    })
    .catch((error) => {
      // Handle errors and respond with status 500 (Internal Server Error)
      res.status(500).json({
        message: "Message not found.",
        error: { message: "Message not found", error: error },
      });
    });
});

// ======================================================================== POST
// Define a POST endpoint to add a new message
router.post("/", (req, res, next) => {
  const maxMessageId = sequenceGenerator.nextId("messages"); // Generate the next message ID

  // Get contact id
  Contact.findOne({ id: req.body.senderId }).then((contact) => {
    //
    const existingContact = new Contact({
      id: contact.senderId,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      description: contact.description,
      imageUrl: contact.imageUrl,
      group: contact.group,
    });

    console.log(
      ">> SERVER:MESSAGES:POST:req.body.senderId: ",
      req.body.senderId
    );
    console.log(">> SERVER:MESSAGES:POST:existingContact: ", existingContact);

    // Create a new message object using the data from the request body
    const message = new Message({
      id: maxMessageId,
      subject: req.body.subject,
      msgText: req.body.msgText,
      senderId: req.body.senderId,
      _senderId: existingContact._id,
    });

    console.log(">> SERVER:MESSAGES:POST:message: ", message);

    // Save the message to the database
    message
      .save()
      .then((message) => {
        // Respond with status 201 (Created) and send the created message as JSON
        console.log(">> SERVER:MESSAGES:POST:201");
        res.status(201).json({
          message: "Message added successfully",
          messageItem: message,
        });
      })
      .catch((error) => {
        // Handle errors and respond with status 500 (Internal Server Error)
        console.log(">> SERVER:MESSAGES:POST:500 ", error);
        res.status(500).json({
          message: "An error occurred",
          error: error,
        });
      });
  });
});

// Export the router object to make it available to other parts of the application
module.exports = router;
