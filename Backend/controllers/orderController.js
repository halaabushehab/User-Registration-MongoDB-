// const Order = require('../models/Order');
// const User = require('../models/User');
// const Product = require('../models/Product');


// const createOrder = async (req, res) => {
//     try {
//         const userId = req.user.id; // نحصل على معرف المستخدم من التوكن
//         const { products } = req.body;

//         if (!products || products.length === 0) {
//             return res.status(400).json({ message: "No products provided" });
//         }

//         let totalAmount = 0;
//         const orderItems = [];

//         products.forEach(item => {
//             totalAmount += item.price * item.quantity;
//             orderItems.push({ name: item.name, price: item.price, quantity: item.quantity });
//         });

//         const newOrder = new Order({
//             user: userId,
//             products: orderItems,
//             totalAmount
//         });

//         await newOrder.save();
//         res.status(201).json({ message: "Order created successfully", order: newOrder });

//     } catch (error) {
//         res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
// };



// const getUserOrders = async (req, res) => {
//     try {
//         const userId = req.user.id; // المستخدم الحالي

//         const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

//         res.status(200).json({ orders });
//     } catch (error) {
//         res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
// };

// module.exports = { createOrder, getUserOrders };

// const Order = require('../models/Order');
// const User = require('../models/User');
// const Product = require('../models/Product');

// // إنشاء طلب جديد
// const createOrder = async () => {
//   try {
//       const orderData = {
//           userId: "12345", // Replace with actual user ID retrieval
//           items: [{ productId: "abc123", quantity: 2 }],
//           totalPrice: 50.0,
//       };

//       const response = await axios.post("http://localhost:8000/api/orders", orderData, {
//           headers: { "Content-Type": "application/json" },
//       });

//       console.log("Order created:", response.data);
//   } catch (error) {
//       console.error("Error creating order:", error);
//   }
// };

// // استرجاع الطلبات الخاصة بمستخدم معين
// exports.getUserOrders = async (req, res) => {
//   const { userId } = req.params;

//   try {
//       const orders = await Order.find({ user: userId }).populate('user'); // يمكنك استخدام populate لجلب معلومات المستخدم إذا احتجت
//       res.status(200).json(orders);
//   } catch (error) {
//       console.error("Error fetching orders:", error);
//       res.status(500).json({ message: error.message });
//   }
// };