const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// 🔹 استرجاع الطلبات حسب معرف المستخدم
router.get("/user/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) return res.status(400).json({ message: "User ID is required" });

        const orders = await Order.find({ userId });
        res.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// 🔹 إنشاء طلب جديد
router.post("/", async (req, res) => {
    try {
        const { userId, productsList, totalAmount } = req.body;

        if (!userId || !productsList || productsList.length === 0 || totalAmount === undefined) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newOrder = new Order({
            userId,
            productsList,
            totalAmount,
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
