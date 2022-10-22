const { Task } = require("../models/taskModel");
const _ = require("lodash");
module.exports.createTask = () => {
  return async (req,res) => {
    try {
      const task = new Task({
        title: req.body.title,
        createdAt: req.body.createdAt,
      });
      res.send({task:task});
      await task.save();
    } catch (error) {
      console.log(error);
    }
  };
};
module.exports.updateTask = () =>{
   return async(req,res) => {
    try{  
  const updates = _.pick(['title','createdAt']);
    Task.findByIdAndUpdate(req.params.id, {
        title: updates.title,
        createdAt:updates.createdAt
        
    })
    res.json({ message: "Task updated successfully", success: true });
}catch(error){
    console.log(error);
}
   }
}
module.exports.deleteTask = () => {
    return async(req,res) =>{
      await Task.findByIdAndDelete(req.params.id);
      res.json({ message: "Task deleted successfully", success: true });
    }
}
module.exports.getTasks = () => {
    return async(req,res) => {
      const task =   await Task.find(req.body.id);
        return res.json({ task : task, success: true });
    }
}