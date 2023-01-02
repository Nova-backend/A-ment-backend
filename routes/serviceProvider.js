const express = require("express");
const {registerDefinition} = require("swaggiffy");
const serviceProviderRouter = express.Router();
const {
    signup,
    deleteUser,
    updateUser,
    getUser,
    login,
    forgotPassword,
    oAuth,
    getGoogleUser,
    verifyEmail,
  } = require("../contollers/userInfo.js");

serviceProviderRouter.post("/signup", signup());
serviceProviderRouter.post("/verifyEmail", verifyEmail())
serviceProviderRouter.put("/updateUser/:id", updateUser());
serviceProviderRouter.delete("/deleteUser/:id", deleteUser());
serviceProviderRouter.get("/getUser", getUser());
serviceProviderRouter.post("/login", login());
serviceProviderRouter.put("/forgotpassword", forgotPassword());
serviceProviderRouter.get("/signup/google", oAuth());
serviceProviderRouter.post("/signup/google", oAuth());
serviceProviderRouter.get("/auth/google", getGoogleUser());
registerDefinition(serviceProviderRouter, {tags:'ServiceProvider', mappedSchema:'ServiceProvider',basePath:'/serviceProvider'})
module.exports.serviceProviderRouter = serviceProviderRouter;