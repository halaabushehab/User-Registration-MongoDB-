const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(403).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error("JWT Verify Error:", err); // لطباعة تفاصيل الخطأ
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.userId = decoded.id; // تخزين userId في الطلب
        next(); // الانتقال إلى المكون التالي
    });
    
};

module.exports = authMiddleware;