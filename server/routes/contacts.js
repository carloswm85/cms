// Importing express to create a router object for handling routes
var express = require("express");
var router = express.Router();

// Importing sequenceGenerator for generating sequence IDs
const sequenceGenerator = require("./sequenceGenerator");

// Importing the Contact model to interact with the contacts collection in MongoDB
const Contact = require("../models/contact");

// ===================================================================== GET ALL
// Define a GET endpoint to fetch all contacts
router.get("/", (req, res, next) => {
  Contact.find() // Retrieve all contacts from the collection
    .populate('group')
    .then((contacts) => {
      // Respond with status 200 (OK) and send the contacts as JSON
      res.status(200).json({
        message: "Contacts fetched successfully from the MongoDB database!",
        contacts: contacts,
      });
    })
    .catch((error) => {
      // Handle errors and respond with status 500 (Internal Server Error)
      res.status(500).json({
        message: "Contact not found.",
        error: { contact: "Contact not found", error: error },
      });
    });
});

// ======================================================================== POST
// Define a POST endpoint to add a new contact
router.post("/", (req, res, next) => {
  const maxContactId = sequenceGenerator.nextId("contacts"); // Generate the next contact ID

  // Create a new contact object using the data from the request body
  const contact = new Contact({
    id: maxContactId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url,
  });

  // Save the contact to the database
  contact
    .save()
    .then((createdContact) => {
      // Respond with status 201 (Created) and send the created contact as JSON
      res.status(201).json({
        message: "Contact added successfully",
        contact: createdContact,
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
// Define a PUT endpoint to update an existing contact by ID
router.put("/:id", (req, res, next) => {
  Contact.findOne({ id: req.params.id }) // Find the contact by ID
    .then((contact) => {
      if (!contact) {
        return res.status(404).json({
          message: "Contact not found.",
        });
      }

      // Update the contact fields with the data from the request body
      contact.name = req.body.name;
      contact.description = req.body.description;
      contact.url = req.body.url;

      // Save the updated contact to the database
      Contact.updateOne({ id: req.params.id }, contact)
        .then((result) => {
          // Respond with status 204 (No Content) indicating successful update
          res.status(204).json({
            message: "Contact updated successfully",
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
      // Handle errors when the contact is not found and respond with status 500 (Internal Server Error)
      res.status(500).json({
        message: "Contact not found.",
        error: { contact: "Contact not found", error: error },
      });
    });
});

// ====================================================================== DELETE
// Define a DELETE endpoint to remove a contact by ID
router.delete("/:id", (req, res, next) => {
  Contact.findOne({ id: req.params.id }) // Find the contact by ID
    .then((contact) => {
      if (!contact) {
        return res.status(404).json({
          message: "Contact not found.",
        });
      }

      // Delete the contact from the database
      Contact.deleteOne({ id: req.params.id })
        .then((result) => {
          // Respond with status 204 (No Content) indicating successful deletion
          res.status(204).json({
            message: "Contact deleted successfully",
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
      // Handle errors when the contact is not found and respond with status 500 (Internal Server Error)
      res.status(500).json({
        message: "Contact not found.",
        error: { contact: "Contact not found", error: error },
      });
    });
});

// Export the router object to make it available to other parts of the application
module.exports = router;
