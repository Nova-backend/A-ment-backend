const messageModel = require("../models/chatModel");

module.exports.addMessage = () => {
  return async (req, res) => {
    try {
      const { from, to, message } = req.body;
      const data = new messageModel({
        message: {
          text: message,
        },
        users: [from, to],
        sender: from,
      });
      console.log("dghdhjfkshfs");
      console.log(req.body);
     await data.save()
      if (data)
        return res.json({
          message: "Message added successfully!",
        });
      return res.json({
        message: "Failed to add message to DB",
      });
    } catch (err) {
      console.log(err);
    }
  };
};
module.exports.getAllMessage = () => {
  return async (req, res) => {
    try {
      const { from, to } = req.body;
      const messages = await messageModel
        .find({
          users: {
            $all: [from, to],
          },
        })
        .sort({ updatedAt: 1 });

      const projectMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender.toString() === from,
          message: msg.message.text,
        };
      });

      res.json(projectMessages);
    } catch (error) {
      next(error);
    }
  };
};
