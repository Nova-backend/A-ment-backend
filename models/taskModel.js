const { boolean } = require("joi");
const mongoose = require("mongoose");
// const { registerSchema } = require("swaggiffy");

const Task = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  completed: {
    type: Boolean,
    required: true,
  },
});
module.exports.Task = mongoose.model("task", Task);
// registerSchema("task", Task);
