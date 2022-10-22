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
    const updates = _.pick(['title','createdAt']);
    Task.findByIdAndUpdate(req.params.id, {
        
    })
   }
}