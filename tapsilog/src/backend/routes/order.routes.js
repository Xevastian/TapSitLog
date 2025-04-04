import express from "express";
import Order from "../models/orderModel.js";

const router = express.Router();

router.post("/addOrder", async(req, res) => {
    const {Content, Total,TableID, Status,CustomerNumber} = req.body;
    if(!Status) {
        req.body.Status = 'unpaid';
    }
    try {
        const newOrder = new Order({Content, Total, TableID, Status, CustomerNumber});
        await newOrder.save();
        res.status(201).json(newOrder);
        console.log("New order created:", newOrder);
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error });
    }
});

router.get("/getOrder", async (req, res) => {
    try {
        const orders = await Order.find().populate('TableID');
        res.status(200).json(orders);
    } catch (error) {
        res.status(404).json({ message: "Error fetching orders", error });
    }
});

router.get("/getOrder/:OrderID", async (req, res) => {
    const { OrderID } = req.params;
    try {
        const order = await Order.findById(OrderID).populate('TableID');
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(404).json({ message: "Error fetching order", error });
    }
});

router.put("/updateOrder/:OrderID", async (req, res) => {
    const { OrderID } = req.params;
    const { Content, Total, Status } = req.body;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            OrderID,
            { Content, Total, Status },
            { new: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: "Error updating order", error });
    }
});

router.delete("/deleteOrder/:OrderID", async (req, res) => {
    const { OrderID } = req.params;
    try {
        const deletedOrder = await Order.findByIdAndDelete(OrderID);
        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting order", error });
    }
});



export default router;