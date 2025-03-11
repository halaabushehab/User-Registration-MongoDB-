const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    productsList: [
        {
            name: String, 
            price: Number,
            quantity: Number,
        },
    ],
    totalAmount: { type: Number, required: true },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;

// const mongoose = require("mongoose");

// const OrderSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   products: [
//     {
//       name: String,
//       price: Number,
//       quantity: Number,
//     }
//   ],
//   totalAmount: { type: Number, required: true },
//   status: { type: String, enum: ["pending", "shipped", "delivered"], default: "pending" }
// }, { timestamps: true });

// module.exports = mongoose.model("Order", OrderSchema);
