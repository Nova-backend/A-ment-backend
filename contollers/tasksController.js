const { Task } = require("../models/taskModel");
const _ = require("lodash");
module.exports.createTask = () => {
  return async () => {
    try {
      const task = new Task({
        title: req.body.title,
        createdAt: req.body.createdAt,
      });
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
    return async() =>{
      await Task.findByIdAndDelete(req.params.id);
      res.json({ message: "Task deleted successfully", success: true });
    }
}
module.exports.getTasks = () => {
    return async() => {
        await Task.find(req.params.id);
        return res.json({ task: task, success: true });
    }
}