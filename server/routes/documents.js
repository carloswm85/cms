// Importing express to create a router object for handling routes
var express = require("express");
var router = express.Router();

// Importing sequenceGenerator for generating sequence IDs
const sequenceGenerator = require("./sequenceGenerator");

// Importing the Document model to interact with the documents collection in MongoDB
const Document = require("../models/document");

// ===================================================================== GET ALL
// Define a GET endpoint to fetch all documents
router.get("/", (req, res, next) => {
  Document.find() // Retrieve all documents from the collection
    .then((documents) => {
      // Respond with status 200 (OK) and send the documents as JSON
      res.status(200).json({
        message: "Documents fetched successfully from the MongoDB database!",
        documents: documents,
      });
    })
    .catch((error) => {
      // Handle errors and respond with status 500 (Internal Server Error)
      res.status(500).json({
        message: "Document not found.",
        error: { document: "Document not found", error: error },
      });
    });
});

// ======================================================================== POST
// Define a POST endpoint to add a new document
router.post("/", (req, res, next) => {
  const maxDocumentId = sequenceGenerator.nextId("documents"); // Generate the next document ID

  // Create a new document object using the data from the request body
  const document = new Document({
    id: maxDocumentId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url,
  });

  // Save the document to the database
  document
    .save()
    .then((createdDocument) => {
      // Respond with status 201 (Created) and send the created document as JSON
      res.status(201).json({
        message: "Document added successfully",
        document: createdDocument,
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
// Define a PUT endpoint to update an existing document by ID
router.put("/:id", (req, res, next) => {
  Document.findOne({ id: req.params.id }) // Find the document by ID
    .then((document) => {
      if (!document) {
        return res.status(404).json({
          message: "Document not found.",
        });
      }

      // Update the document fields with the data from the request body
      document.name = req.body.name;
      document.description = req.body.description;
      document.url = req.body.url;

      // Save the updated document to the database
      Document.updateOne({ id: req.params.id }, document)
        .then((result) => {
          // Respond with status 204 (No Content) indicating successful update
          res.status(204).json({
            message: "Document updated successfully",
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
      // Handle errors when the document is not found and respond with status 500 (Internal Server Error)
      res.status(500).json({
        message: "Document not found.",
        error: { document: "Document not found", error: error },
      });
    });
});

// ====================================================================== DELETE
// Define a DELETE endpoint to remove a document by ID
router.delete("/:id", (req, res, next) => {
  Document.findOne({ id: req.params.id }) // Find the document by ID
    .then((document) => {
      if (!document) {
        return res.status(404).json({
          message: "Document not found.",
        });
      }

      // Delete the document from the database
      Document.deleteOne({ id: req.params.id })
        .then((result) => {
          // Respond with status 204 (No Content) indicating successful deletion
          res.status(204).json({
            message: "Document deleted successfully",
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
      // Handle errors when the document is not found and respond with status 500 (Internal Server Error)
      res.status(500).json({
        message: "Document not found.",
        error: { document: "Document not found", error: error },
      });
    });
});

// Export the router object to make it available to other parts of the application
module.exports = router;
