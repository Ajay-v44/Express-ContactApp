var express = require("express");
var router = express.Router();
const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
/* GET home page. */
router.get("/", function (req, res, next) {getContacts(req,res)});
router.post("/", function (req, res, next) {createContact(req,res)});
router.get("/:id", function (req, res, next) {getContact(req,res)});
router.put("/:id", function (req, res, next) {updateContact(req,res)});
router.delete("/:id", function (req, res, next) {deleteContact(req,res)});

module.exports = router;
