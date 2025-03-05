import Task from '../models/Task.js';
import Category from "../models/Category.js";
import user from "../models/User.js";
import User from "../models/User.js";

export async function createTask(req, res) {

    try {
        const{name, description,priority,dueDate,category,user,status} = req.body;

        const cat = await Category.findOne({name:category});
        if (!cat) {
           return  res.status(400).json({ error: "Category non existing" });
        }
        const existingUser = await User.findOne({ email: user });
        if (!existingUser) {
          return  res.status(400).json({ error: "User does not exist" });
        }
        const task = new Task({
            name,
            description,
            priority,
            dueDate,
            category: cat._id,
            user: existingUser._id,
            status,
        })
        await task.save();
        existingUser.tasks.push(task._id);
        await existingUser.save();
        res.status(200).json({task})
    }
    catch (error) {
        console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
}


export async function updateTask(req, res) {
    try {
        const{id,name, description,priority,dueDate,category,user,status} = req.body;
        const cat = await Category.findOne({name:category});
        if (!cat) {
            return  res.status(400).json({ error: "Category non existing" });
        }
        const existingUser = await User.findOne({ email: user });
        if (!existingUser) {
            return  res.status(400).json({ error: "User does not exist" });
        }


         await Task.findByIdAndUpdate({_id:id},{
           name: name,
           description: description,
           priority: priority,
           dueDate: dueDate,
           category: cat._id,
           user: existingUser._id,
           status,
       });
        res.status(200).json({message:"task updated"})
    }
    catch (e) {
        res.status(400).json({ error: "Server error",e });
    }
}

export async function deleteTask(req, res) {
    try {
        const { id } = req.body;
        await Task.findByIdAndDelete({_id:id})
        res.status(200).json({message:"Task deleted successfully"})
    }
    catch (e) {
        res.status(400).json({ error: "Server error",e});
    }

}