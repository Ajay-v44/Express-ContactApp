const contact = require("../models/contactModel");
const getContacts = async (req, res) => {
  const contacts = await contact.find({ user_id: req.user.id });
  res.status(200).json({ message: "get all contacts", data: contacts });
};
const createContact = async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400).json({
      message: "allfields are mandratory",
    });
  }
  const quey = await contact.create({
    user_id:req.user.id,
    name,
    email,
    phone,
  });
  res.status(201).json({
    message: "create contacts",
    data: quey,
  });
};

const getContact = async (req, res) => {
  try {
    const query = await contact.findById(req.params.id);
    if (!query) {
      return res.status(400).json({ message: "Cant Find" });
    }
    return res
      .status(200)
      .json({ message: `get contact of ${req.params.id}`, data: query });
  } catch (err) {
    res.status(400).json({ message: "Cant Find" });
    console.log(err);
  }
};
const updateContact = async (req, res) => {
  const query = await contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res
    .status(200)
    .json({ message: `update contact of ${req.params.id}`, data: query });
};
const deleteContact = async (req, res) => {
  try {
    const query = await contact.findById(req.params.id);
    if (!query) {
      return res.status(400).json({ message: "Cant Find" });
    }
    await query.deleteOne({ _id: req.params.id });
    return res
      .status(200)
      .json({ message: `delete contact of ${req.params.id}`, data: query });
  } catch (err) {
    res.status(400).json({ message: "Cant Find" });
    console.log(err);
  }
};

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
