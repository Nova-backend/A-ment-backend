const express = require("express");
const clientRouter = express.Router();
const { signUp, signin } = require("../contollers/clientUser");

clientRouter.post("/signup", signUp);
clientRouter.post("/signin", signin);
module.exports.clientRouter = clientRouter;