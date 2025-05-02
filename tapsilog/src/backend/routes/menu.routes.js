import express from "express";
import Menu from "../models/menuModel.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "../uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    },
});


const upload = multer({ storage: storage});

router.get("/getMenu", async (req, res) => {
    try {
        const menu = await Menu.find();
        res.json(menu);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch menu", error: err });
    }
});

router.post("/addMenu", upload.single("foodImage"), async (req, res) => {
    try {
        const { Food_Name, Food_Price, Food_Category} = req.body;
        const imagePath = req.file ? req.file.path : null;

        const newMenu = new Menu({
            Food_Name,
            Food_Price,
            Food_Category,
            Food_Image: imagePath,
        });

        await newMenu.save();
        res.status(201).json(newMenu);
    } catch (err) {
        res.status(500).json({ message: "Failed to add menu item", error: err.message });
    }
});

router.put("/updateMenu/:id", async (req, res) => {
    try {
        const updatedMenu = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedMenu);
    } catch (err) {
        res.status(500).json({ message: "Update failed", error: err.message });
    }
});

router.delete("/deleteMenu/:id", async (req, res) => {
    try {
        const menuItem = await Menu.findById(req.params.id);

        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        if (menuItem.image) {
            const imagePath = path.resolve(menuItem.image); 
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error("Failed to delete image:", err);
                }
            });
        }

        await Menu.findByIdAndDelete(req.params.id);
        res.json({ message: "Menu item and image deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Delete failed", error: err.message });
    }
});

export default router;
