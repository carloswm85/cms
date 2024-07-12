const mongoose = require("mongoose");
const unusedLinkUseForReferenceToFile = require("../../src/app/documents/document.model");

const documentSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String },
  description: { type: String, required: true },
  url: { type: String, required: true },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Document" }],
});

module.exports = mongoose.model("Document", documentSchema);

// Frontend model
/* ../../src/app/documents/document.model */

// Example item from Mongo database
/* {
  _id: ObjectId("58cb2ab6a187c5aa1124e31a"),
  id: "48",
  name: "CIT 340 - Networking II",
  description: "description 48",
  url: "https: //content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course",
  children: [
    {
      id: "21",
      name: "Lesson 1 - JavaScript Best Practices",
      description: "description 21",
      url: "https: //content.byui.edu/file/f0594919-9524-47eb-9f4d-5c7239c3c002/1/Lesson1Introduction.pdf",
    },
  ],
} */
