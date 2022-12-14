const mongoose = require("mongoose");
const { registerSchema } = require("swaggiffy");
const joi = require("joi");
const { string, number } = require("joi");
const Usergoogle = mongoose.Schema({
  given_name: {
    type: String,
  },
  userName: {
    type: String,
  },
  email: {
    type: String,
    trim: true,
    unique: false,
    required: false,
    
  },
  password: {
    type: String,
    unique: false,
    required: false,
  },
  image: {
    type: String,
  },
  contact: {
    type: Number,
  },
  employees: [
    {
      fullname: {
        type: String,
      },
      position: {
        type: String,
      },
      workingHours: {
        type: Date,
      },
      workingDays: {
        type: String,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
      },
    },
  ],
  servicesOffered: [
    {
      digitalisedService: {
        type: String,
      },
      unDigitalisedService: {
        type: String,
      },
    },
  ],
  bio: {
    type: String,
  },
});

const OTP = mongoose.Schema({
  OTP: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    // required: true
  },
});

module.exports.Usergoogle = mongoose.model("usergoogle", Usergoogle);
module.exports.Otpmodel = mongoose.model("OTP", OTP);
registerSchema("usergoogle", Usergoogle);
registerSchema("OTP", OTP);
