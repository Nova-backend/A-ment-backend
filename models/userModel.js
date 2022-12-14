const mongoose = require("mongoose");
const { registerSchema } = require("swaggiffy");
const joi = require("joi");
const { string, number } = require("joi");
const User = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    // required: true,
    trim: true,
    unique: false,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
  image: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  skills: {
    type: String,
    enum: [],
  },
  cv: {
    type: String,
    required: false,
  },
  achievements: {
    type: Object,
    required: false,
  },
  certifications: {
    type: String,
  },
  employees: [
    {
      fullname: {
        type: String,
        required: true,
      },
      position: {
        type: String,
        required: true,
      },
      workingHours: {
        type: Date,
        required: true,
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
  googleId: String,
});
const validation = (data) => {
  data = new joi.object({
    fullName: joi.string().required().min(4),
    userName: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().required(),
  });
  return data.validate();
};

const OTP = mongoose.Schema({
  OTP: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports.validation = validation;
module.exports.User = mongoose.model("user", User);
module.exports.OTPmodel = mongoose.model("OTPs", OTP);
registerSchema("validation", validation);
registerSchema("user", User);
registerSchema("OTP", OTP);
