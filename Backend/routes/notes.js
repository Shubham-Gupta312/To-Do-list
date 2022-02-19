const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const { body, validationResult } = require('express-validator'); // doesn't work addnotes
const Notes = require("../Models/Notes");

//ROUTE 1 --> // Get all notes of user using GET "/api/notes/fetchallNotes". Require Login
router.get("/fetchallNotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 2 --> // ADD notes of user using POST "/api/notes/addnote". Require Login
router.post('/addnote', fetchuser, [
  body('title', "Enter a valid title").isLength({ min: 3 }),
  body('description', "Description Should be minimum 5 character").isLength({ min: 5 })
], async (req, res) => {

  try {
      const { title, description, tag } = req.body;
      //if there are erros then this bunch of code speacify return bad request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
          title, description, tag, user: req.user.id
      })
      const saveNote = await note.save();
      res.json(saveNote);
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }

})
//ROUTE 3 --> // UPDATE an Existing note of user using PUT "/api/notes/updateNote". Require Login
router.put('/updateNote/:id', fetchuser, async (req, res) => {
  //DESTRUCTURING
  const { title, description, tag } = req.body;
  try {
      // Create a newNote object
      const newNote = {};
      if (title) { newNote.title = title };
      if (description) { newNote.description = description };
      if (tag) { newNote.tag = tag };

      // Find the note to be updated and update it
      let note = await Notes.findById(req.params.id);
      if (!note) { return res.status(404).send("Not Found") }

      if (note.user.toString() !== req.user.id) {
          return res.status(401).send("Not Allowed");
      }
      note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
      res.json({ note });
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})
// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {
      // Find the note to be delete and delete it
      let note = await Notes.findById(req.params.id);
      if (!note) { return res.status(404).send("Not Found") }

      // Allow deletion only if user owns this Note
      if (note.user.toString() !== req.user.id) {
          return res.status(401).send("Not Allowed");
      }

      note = await Notes.findByIdAndDelete(req.params.id)
      res.json({ "Success": "Note has been deleted", note: note });
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})
module.exports = router;
