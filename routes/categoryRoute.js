import Router from "express";
import {createCategory, deleteCategory, getCats, updateCategory} from "../controllers/categoryController.js";
import verifyToken, {verifyAdmin, verifySuperAdmin} from "../middlewares/authMiddleware.js";
import validator from '../middlewares/validator.js';
import {check} from "express-validator";

const router = Router();

router.post("/addCat",
    check("name")
        .notEmpty()
        .withMessage("Category Name is required"),
    validator,
    verifyAdmin,
    createCategory);
router.put("/updateCat", verifyAdmin, updateCategory);
router.get("/getCats", verifyAdmin, getCats);
router.delete("/delete/:id", verifyAdmin, deleteCategory);
router.delete("deleteSA/:id", verifySuperAdmin, getCats);

export default router;