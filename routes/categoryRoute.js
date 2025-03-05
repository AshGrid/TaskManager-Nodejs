
import Router from "express";
import {createCategory, updateCategory} from "../controllers/categoryController.js";
import verifyToken, {verifyAdmin} from "../middlewares/authMiddleware.js";
import validator from '../middlewares/validator.js';
import{check} from "express-validator";
const router = Router();

router.post("/addCat",
    check("name")
        .notEmpty()
        .withMessage("Category Name is required"),
    validator,
    verifyAdmin,
    createCategory);
router.put("/updateCat",updateCategory);

export default router;