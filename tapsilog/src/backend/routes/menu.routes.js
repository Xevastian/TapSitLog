import express from "express";
import Menu from "../models/menuModel.js";

const router = express.Router();

router.post("/addMenu", async (req, res) => {
    const { Food_Name, Food_Price } = req.body;
    try {
        const newMenu = new Menu({ Food_Name, Food_Price });
        await newMenu.save();
        res.status(201).json(newMenu);
        console.log("New menu item created:", newMenu);
    } catch (error) {
        res.status(500).json({ message: "Error creating menu item", error });
    }
});

router.put("/updateMenuStocks/:FoodID", async (req, res) => {
    const { FoodID } = req.params;
    const { Stocks } = req.body;
    try {
        const updatedMenu = await Menu.findByIdAndUpdate(
            FoodID,
            { Stocks },
            { new: true }
        );
        if (!updatedMenu) {
            return res.status(404).json({ message: "Menu item not found" });
        }
        res.status(200).json(updatedMenu);
    } catch (error) {
        res.status(500).json({ message: "Error updating menu stocks", error });
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

export default router;