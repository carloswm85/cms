// Importing express to create a router object for handling routes
var express = require("express");
var router = express.Router();

// Importing sequenceGenerator for generating sequence IDs
const sequenceGenerator = require("./sequenceGenerator");

// Importing the Message model to interact with the messages collection in MongoDB
const Message = require("../models/message");

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

  // Create a new message object using the data from the request body
  const message = new Message({
    id: maxMessageId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url,
  });

  // Save the message to the database
  message
    .save()
    .then((createdMessage) => {
      // Respond with status 201 (Created) and send the created message as JSON
      res.status(201).json({
        message: "Message added successfully",
        message: createdMessage,
      });
    })
    .catch((error) => {
      // Handle errors and respond with status 500 (Internal Server Error)
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});

// ========================================================================= PUT
// Define a PUT endpoint to update an existing message by ID
router.put("/:id", (req, res, next) => {
  Message.findOne({ id: req.params.id }) // Find the message by ID
    .then((message) => {
      if (!message) {
        return res.status(404).json({
          message: "Message not found.",
        });
      }

      // Update the message fields with the data from the request body
      message.name = req.body.name;
      message.description = req.body.description;
      message.url = req.body.url;

      // Save the updated message to the database
      Message.updateOne({ id: req.params.id }, message)
        .then((result) => {
          // Respond with status 204 (No Content) indicating successful update
          res.status(204).json({
            message: "Message updated successfully",
          });
        })
        .catch((error) => {
          // Handle errors and respond with status 500 (Internal Server Error)
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      // Handle errors when the message is not found and respond with status 500 (Internal Server Error)
      res.status(500).json({
        message: "Message not found.",
        error: { message: "Message not found", error: error },
      });
    });
});

// ====================================================================== DELETE
// Define a DELETE endpoint to remove a message by ID
router.delete("/:id", (req, res, next) => {
  Message.findOne({ id: req.params.id }) // Find the message by ID
    .then((message) => {
      if (!message) {
        return res.status(404).json({
          message: "Message not found.",
        });
      }

      // Delete the message from the database
      Message.deleteOne({ id: req.params.id })
        .then((result) => {
          // Respond with status 204 (No Content) indicating successful deletion
          res.status(204).json({
            message: "Message deleted successfully",
          });
        })
        .catch((error) => {
          // Handle errors and respond with status 500 (Internal Server Error)
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      // Handle errors when the message is not found and respond with status 500 (Internal Server Error)
      res.status(500).json({
        message: "Message not found.",
        error: { message: "Message not found", error: error },
      });
    });
});

// Export the router object to make it available to other parts of the application
module.exports = router;
