import express from "express";
import Menu from "../models/menuModel.js";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.test(ext)) {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed"), false);
    }
};

const upload = multer({ storage, fileFilter });

router.get("/getMenu", async (req, res) => {
    try {
        const menu = await Menu.find();
        res.json(menu);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch menu", error: err });
    }
});

router.post("/addMenu", upload.single("image"), async (req, res) => {
    try {
        const { Food_Name, Food_Price, Food_Category } = req.body;
        const imagePath = req.file ? req.file.path : null;

        const newMenu = new Menu({
            Food_Name,
            Food_Price,
            Food_Category,
            image: imagePath,
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
        await Menu.findByIdAndDelete(req.params.id);
        res.json({ message: "Menu item deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Delete failed", error: err.message });
    }
});

export default router;
