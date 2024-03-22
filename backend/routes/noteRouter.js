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

module.exports = router;
