const express = require("express");
const {registerDefinition} = require("swaggiffy");
const clientRouter = express.Router();
const { signUp, signin } = require("../contollers/clientUser");

clientRouter.post("/signup", signUp);
clientRouter.post("/signin", signin);7
registerDefinition(clientRouter, {tags:'Client', mappedSchema:'User',basePath:'/client'})
module.exports.clientRouter = clientRouter;