const Contacts = require("../models/contactModel");
const asyncHandler = require("express-async-handler");

const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is :", req.body);
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All input fields are mandatory!");
  }

  const contact = await Contacts.create({
    User_id: req.user.id,
    name,
    email,
    phone,
  });

  res.status(200).json(contact);
  console.log("Visited POST CONTACTS created contact:", contact);
});

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contacts.find({ User_id: req.user.id });
  // res.status(200).send("GET CONTACTS");
  res.status(200).json(contacts);
  console.log("Visited GET CONTACTS", contacts);
});

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  // res.status(200).send("GET CONTACT");
  res.status(200).json(contact);
  console.log("Visited GET CONTACT", contact);
});

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("No such contact in the database");
  }

  if (contact.User_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User don't have any permission to update other user's contact"
    );
  }

  const updatedContact = await Contacts.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  // res.status(200).send("UPDATE A CONTACT");
  res.status(200).json(updatedContact);
  console.log("Visited UPDATE A CONTACT", updatedContact);
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);

  if (!contact) {
    res.status(404);
    console.log("Contact not in database");
  }

  if (contact.User_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User don't have the permission to delete other user's contact"
    );
  }

  const deletedContact = await Contacts.findByIdAndDelete(req.params.id);

  // res.status(200).send("DELETE A CONTACT");
  res.status(200).json(deletedContact);
  console.log("Visited DELETE A CONTACT", deletedContact);
});

module.exports = {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
};
