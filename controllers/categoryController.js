import Category from "../models/Category.js";
import {validationResult} from "express-validator";
import Task from "../models/Task.js";

export async function createCategory(req, res) {
    try {

        const {name, description} = req.body;
        console.log(name, description);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({error: errors.mapped()});
        }
        if (!name) {
            return res.status(400).json({error: "Name is required"});
        }

        const existingCat = await Category.findOne({name: name})

        if (existingCat) {
            return res.status(400).json({error: "Category already exists"});
        }

        const category = new Category({
            name,
            description,
        });

        await category.save();
        res.status(201).json({message: "Category created successfully", category});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Server error"});
    }
}

export async function updateCategory(req, res) {
    try {
        const {oldName, name, description} = req.body;
        const updated = await Category.findOneAndUpdate({name: oldName}, {name: name, description: description})
        res.status(200).json({message: "Category updated successfully", updated});
    } catch (e) {
        console.error(e);
        res.status(500).json({error: "Server error"});

    }
}

export async function getCats(req, res) {
    try {
        const cats = await Category.find();
        res.status(200).json(cats);
    } catch (e) {
        res.status(400).json({error: e});
    }
}

export async function deleteCategory(req, res) {

    try {
        const {id} = req.params;
        const category = await Category.findById(id)
        if (!category) {
            return res.status(400).json({error: "Category not found"});
        }
        const task = Task.find({category: category})
        if (task) {
            res.status(400).json({error: "Task related to this category exists cannot delete"});
        }
        await Category.findByIdAndDelete({_id: id})
        res.status(200).json({message: "Category deleted successfully"})
    } catch (e) {
        res.status(400).json({error: "Server error"});
    }
}

export async function deleteCategorySuperAdmin(req, res) {
    try {
        const {id} = req.params;
        if (!category) {
            return res.status(400).json({error: "Category not found"});
        }
        await Category.findByIdAndDelete({_id: id})
        res.status(200).json({message: "Category deleted successfully"})
    } catch (e) {
        res.status(400).json({error: "Server error"});

    }
}