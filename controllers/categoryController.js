import Category from "../models/Category.js";
import {validationResult} from "express-validator";

export async function createCategory(req, res) {
    try {

        const { name, description } = req.body;
        console.log(name, description);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.mapped() });
        }
        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }

        const existingCat = await Category.findOne({name:name})

        if (existingCat) {
            return res.status(400).json({ error: "Category already exists" });
        }

        const category = new Category({
            name,
            description,
        });

        await category.save();
        res.status(201).json({ message: "Category created successfully", category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

export async function updateCategory(req, res) {
    try {
        const { oldName,name, description } = req.body;
        const updated = await Category.findOneAndUpdate({name:oldName},{name: name,description: description})
        res.status(200).json({message: "Category updated successfully",updated});
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Server error" });

    }
}