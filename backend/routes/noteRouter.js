const express = require("express");
const validationToken = require("../middleware/validateTokenHandler");
const NotesModel = require("../models/NotesModel");
const router = express.Router();

router.post("/", validationToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      res.status(400).json({
        message: "all fields are mandratory",
      });
    }
    const query = await NotesModel.create({
      user_id: req.user.id,
      title,
      description,
    });
    res.status(201).json({
      message: "Note added",
      data: query,
    });
  } catch (err) {
    res.status(400).json({
      message: String(err),
    });
  }
});
router.get("/", validationToken, async (req, res) => {
  try {
    const response = await NotesModel.find( {user_id: req.user.id} );
    res.status(200).json({
      data: response,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error Occured",
    });
  }
});
router.patch("/:id", validationToken, async (req, res) => {
  try {
    const response = await NotesModel.findById(req.params.id);
    if (!response) {
      res.status(400).json({
        message: "Cant find",
      });
    }
    const data = await NotesModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      message: "Updated succesfully",
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: String(err),
    });
  }
});

router.delete("/:id", validationToken, async (req, res) => {
  try {
    const response = await NotesModel.deleteOne({_id:req.params.id});
    res.status(200).json({
      message: `deleted note of  ${req.params.id}`,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error Occured",
    });
  }
});
module.exports = router;
