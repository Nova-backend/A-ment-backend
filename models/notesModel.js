const { boolean } = require("joi");
const mongoose = require("mongoose");
const { registerSchema } = require("swaggiffy");

const Note= new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  completed: {
    type:Boolean,
    required:true
  }
});
module.exports.Note = mongoose.model("note", Note);
registerSchema("note", Note);