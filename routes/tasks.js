const {
    createTask,
    updateTask,
    deleteTask,
    getTasks,
  } = require("../contollers/tasksController");
    const express = require("express");
    const taskRouter = express.Router();

    taskRouter.post("/createTask", createTask());
    taskRouter.put("/updateTask/:id", updateTask());
    taskRouter.delete("/deleteTask/:id", deleteTask());
    taskRouter.get("/getTask", getTasks());
    module.exports.taskRouter = taskRouter;
