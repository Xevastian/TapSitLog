import express from "express";
import Table from "../models/tableModel.js";

const router = express.Router();

router.post("/addTable", async (req, res) => {
    const { Table_Number } = req.body;
    try {
        const newTable = new Table({ Table_Number });
        await newTable.save();
        res.status(201).json(newTable);
        console.log("New table created:", newTable);
    } catch (error) {
        res.status(500).json({ message: "Error creating table", error });
    }
});

router.delete("/deleteTable/:TableID", async (req, res) => {
    const { TableID } = req.params;
    try {
        const deletedTable = await Table.findByIdAndDelete(TableID);
        if (!deletedTable) {
            return res.status(404).json({ message: "Table not found" });
        }
        res.status(200).json(deletedTable);
    } catch (error) {
        res.status(500).json({ message: "Error deleting table", error });
    }
});

export default router;