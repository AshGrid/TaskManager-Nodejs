import Router from 'express';
import verifyToken, {verifyAdmin} from "../middlewares/authMiddleware.js";
import {createTask, deleteTask, getTasks, updateTask} from "../controllers/taskController.js";
const router = new Router();

router.post("/addTask",verifyAdmin,createTask)
router.put("/updateTask",verifyAdmin,updateTask)
router.delete("/deleteTask",verifyAdmin,deleteTask)
router.get("/",verifyToken, getTasks);

export default router;