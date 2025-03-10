const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require('./routes/auth');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// تفعيل CORS في البداية:
app.use(cors({
    origin: 'http://localhost:5175', // تأكد من أن هذا هو أصل الفرونت إند
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

connectDB();
app.use("/api/auth", authRoutes);

// في حال كنت تستخدم نقطة نهاية تسجيل منفصلة للتجربة:
app.post('/api/auth/register', (req, res) => {
    console.log("🔴Received data:", req.body);
    // باقي كود التسجيل...
    res.status(201).json({ message: "User registered" });
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});