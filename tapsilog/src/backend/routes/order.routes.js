import express from "express";
import Order from "../models/orderModel.js";

const router = express.Router();

router.post("/addOrder", async (req, res) => {
    const { Content, Total, TableID, Status, CustomerNumber} = req.body;
    try {
        const newOrder = new Order({
            Content,
            Total,
            TableID,
            CustomerNumber,
            Status: Status || "unpaid",
        });
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

// Delete an order
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


router.get("/completed", async (req, res) => {
    try {
        const completedOrders = await Order.find({
            Status: "served"  
        }).populate('TableID');
        res.status(200).json(completedOrders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching completed orders", error });
    }
});


router.get("/pending", async (req, res) => {
    try {
        const pendingOrders = await Order.find({
            Status: "paid"  
        }).populate('TableID');
        res.status(200).json(pendingOrders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching pending orders", error });
    }
});


router.get("/top-selling", async (req, res) => {
    try {
        const orders = await Order.find({
            Status: { $in: ["paid", "served"] }
        });

        const salesMap = {};

        orders.forEach(order => {
            order.Content.forEach(item => {
                const name = item.Food_Name;
                const qty = item.quantity;

                if (salesMap[name]) {
                    salesMap[name] += qty;
                } else {
                    salesMap[name] = qty;
                }
            });
        });

        const topItems = Object.entries(salesMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([Food_Name, quantity]) => ({ Food_Name, quantity }));

        res.status(200).json(topItems);
    } catch (error) {
        res.status(500).json({ message: "Error fetching top selling items", error });
    }
});

export default router;
