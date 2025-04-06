import express from "express";
import Menu from "../models/menuModel.js";

const router = express.Router();

router.post("/addMenu", async (req, res) => {
    const { Food_Name, Food_Price, Food_Category } = req.body;
    try {
        const newMenu = new Menu({ Food_Name, Food_Price, Food_Category });
        await newMenu.save();
        res.status(201).json(newMenu);
        console.log("New menu item created:", newMenu);
    } catch (error) {
        res.status(500).json({ message: "Error creating menu item", error });
    }
});

router.get("/getMenu", async (req, res) => {
    try {
        const menuItems = await Menu.find();
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ message: "Error fetching menu items", error });
    }
});

router.get("/getMenu/:_id", async (req, res) => {
    const { _id } = req.params;
    try {
        const menuItem = await Menu.findById(_id);
        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }
        res.status(200).json(menuItem);
    } catch (error) {
        res.status(500).json({ message: "Error fetching menu item", error });
    }
}
);  

router.delete("/deleteMenu/:_id", async (req, res) => {
    const { _id } = req.params;
    try {
        const deletedMenu = await Menu.findByIdAndDelete(_id);
        if (!deletedMenu) {
            return res.status(404).json({ message: "Menu item not found" });
        }
        res.status(200).json({ message: "Menu item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting menu item", error });
    }
});

export default router;