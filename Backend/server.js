const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require('cookie-parser');
const cors = require('cors');
require("dotenv").config();

const authRoutes = require('./routes/auth');
const ordersRoutes = require("./routes/orderRoutes"); // ✅ تأكد من استيراد هذا السطر

const app = express();
const PORT = process.env.PORT || 5000;

// تفعيل CORS في البداية
app.use(cors({
    origin: 'http://localhost:5173', // تأكد من أن هذا هو أصل الفرونت إند
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

connectDB();

// تعريف المسارات
app.use("/api/auth", authRoutes);
app.use("/api/orders", ordersRoutes);

// نقطة نهاية لتجربة التسجيل
app.post('/api/auth/register', (req, res) => {
    console.log("🔴Received data:", req.body);
    // باقي كود التسجيل...
    res.status(201).json({ message: "User registered" });
});

// بدء تشغيل السيرفر
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});