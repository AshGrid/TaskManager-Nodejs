import Router from 'express';
import verifyToken, {verifyAdmin} from "../middlewares/authMiddleware.js";
import {createTask, deleteTask, updateTask} from "../controllers/taskController.js";
const router = new Router();

router.post("/addTask",verifyToken,createTask)
router.put("/updateTask",verifyAdmin,updateTask)
router.delete("/deleteTask",verifyAdmin,deleteTask)

export default router;