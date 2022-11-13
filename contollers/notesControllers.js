const { Note } = require("../models/notesModel");
const _ = require("lodash");
module.exports.createNote = () => {
  return async (req, res) => {
    try {
      const Note = new Note({
        title: req.body.title,
        createdAt: req.body.createdAt,
        completed: req.body.completed,
      });
      res.send({ Note: Note });
      await Note.save();
    } catch (error) {
      console.log(error);
    }
  };
};
module.exports.updateNote = () => {
  return async (req, res) => {
    try {
      const updates = _.pick(["title", "createdAt"]);
      Note.findByIdAndUpdate(req.params.id, {
        title: updates.title,
        createdAt: updates.createdAt,
      });
      res.json({ message: "Note updated successfully", success: true });
    } catch (error) {
      console.log(error);
    }
  };
};
module.exports.deleteNote = () => {
  return async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted successfully", success: true });
  };
};
module.exports.getNotes = () => {
  return async (req, res) => {
    const Note = await Note.find(req.body.id);
    return res.json({ Note: Note, success: true });
  };
};
