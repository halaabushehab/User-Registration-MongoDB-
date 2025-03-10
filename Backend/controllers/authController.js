const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
    const { username, email, password } = req.body;
    console.log("🔴Received data:", req.body);

    // 🔴 التحقق من تعبئة جميع الحقول
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });

        await user.save();
        console.log("✅ User successfully registered:", user); // ✅ تأكيد التسجيل

        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error("❌ Registration error:", error);
        res.status(500).json({ message: "Registration failed", error: error.message });
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    // التأكد من وجود المستخدم والتحقق من كلمة المرور
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // إنشاء التوكن
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET); // استخدم JWT_SECRET هنا
    console.log('JWT_SECRET:', process.env.JWT_SECRET);

    // إرسال التوكن للمستخدم في الكوكيز
    res.cookie('token', token, { httpOnly: true });
    return res.json({ message: 'Logged in' }); // أعد إرسال الاستجابة هنا
};



const profile = (req, res) => {
    res.json({ message: 'Protected profile', userId: req.userId });
};

module.exports = {
    register,
    login,
    profile,
};