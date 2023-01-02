const express = require("express");
const messageRouter = express.Router();
const {
    addMessage,
    getAllMessage,
    updateMessage,
    deleteMessage
  } = require("../contollers/messageController");

messageRouter.post("/addMessage/", addMessage());
messageRouter.get("/getMessage/", getAllMessage());
messageRouter.put("/updateMessage/:id",updateMessage());
messageRouter.delete("/deleteMessage/:id",deleteMessage());
module.exports.messageRouter = messageRouter;
