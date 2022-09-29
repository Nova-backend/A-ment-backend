const router = require("express").Router();
const { User, validate } = require("../models/userModel");
const bcrypt = require("bcrypt");
