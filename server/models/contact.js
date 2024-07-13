const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  description: { type: String },
  imageUrl: { type: String },
  group: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contact" }],
});

module.exports = mongoose.model("Contact", contactSchema);

// Frontend model
/* ../../src/app/contacts/contact.model */

// Example item from Mongo database
/*
{
  _id: ObjectId("58c767386f1d58ebc37af1e9"),
  id: "1",
  name: "Rex Barzee",
  email: "barzeer@byui.edu",
  phone: "208-496-3768",
  description: "This is some description",
  imageUrl: "../assets/images/barzeer.jpg",
  group: [
    ObjectId("58c767386f1d58ebc37af1ea"),
    ObjectId("58c767386f1d58ebc37af1ee"),
    ObjectId("58c767386f1d58ebc37af1f2"),
  ],
  __v: 14,
}
*/
