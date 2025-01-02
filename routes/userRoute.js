import Router from 'express';
import {createUser, deleteUser, getAllUsers, getUserImage,} from '../controllers/userController.js'
import  upload  from '../middlewares/multerConfig.js';
import verifyToken, {checkBlacklist, verifySuperAdmin} from '../middlewares/authMiddleware.js';
const router = Router();



router.use(checkBlacklist);
router.get("/", verifySuperAdmin, getAllUsers);
router.post("/create",verifySuperAdmin, createUser);
router.delete("/delete",checkBlacklist,verifySuperAdmin, deleteUser);
export default router;
