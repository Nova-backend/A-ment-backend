const mongoose = require("mongoose");
const { registerSchema } = require("swaggiffy");

var schema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  serviceNeeded: {
    type: String,
    required: true,
  },
  specificStaff: {
    type: String,
    required: true,
  },
});

const Userdb = mongoose.model("clientRequestModels", schema);
module.exports = Userdb;
registerSchema("userdb", schema);
