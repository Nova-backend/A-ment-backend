
    const express = require("express");
    const taskRouter = express.Router();
    const {registerDefinition} = require("swaggiffy");
const {
    createTask,
    updateTask,
    deleteTask,
    getTasks,
  } = require("../contollers/tasksController");
 
    taskRouter.post("/createTask", createTask());
    taskRouter.put("/updateTask/:id", updateTask());
    taskRouter.delete("/deleteTask/:id", deleteTask());
    taskRouter.get("/getTask", getTasks());
    registerDefinition(taskRouter, {tags:'Task', mappedSchema:'Task',basePath:'/task'})
    module.exports.taskRouter = taskRouter;
