const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//Route 1.  Fetch all the notes from user id
router.get("/fetchnote", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error.");
  }
});

// Route 2: Create a note.
router.post(
  "/createnote",
  fetchuser,
  [
    body("title", "Title must be atleast 3 characters long").isLength({
      min: 3,
    }),
    body(
      "description",
      "Description must be atleast 5 character long"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, tag } = req.body;
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error.");
    }
  }
);

//Route 3: Update Note
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    //Find the elements to update in the request and store in newNote.
    const newNote = {};
    const { title, description, tag } = req.body;
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //Find the note to update and update it

    let note = await Note.findById(req.params.id);
    if (!note) {
      req.status(404).send("Not found.");
    }

    if (note.user.toString() !== req.user.id) {
      res.status(401).send("Not Allowed.");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json(note);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error.");
  }
});

//Route 4: Delete the note
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      req.status(404).send("Not found.");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed.");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    {
      return res.json({ Success: "Note has been deleted" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error.");
  }
});

module.exports = router;
