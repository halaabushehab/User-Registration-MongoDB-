import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreateOrder.css"; // تأكد من أن المسار صحيح

const CreateOrder = ({ userId }) => {
    const [productsList, setProductsList] = useState([{ productId: '', price: 0, quantity: 1 }]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!userId) {
                console.error('User ID is undefined');
                return; // إذا كان userId غير معرف، لا تقم بعمل طلب
            }
    
            try {
                const response = await axios.get(`http://localhost:8000/api/orders/user/${userId}`);
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
    
        fetchOrders();
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const productsWithDetails = productsList.map(product => ({
                name: product.productId, // استخدم معرف المنتج كاسم
                price: product.price, // تأكد من أن لديك السعر الفعلي
                quantity: product.quantity,
            }));

            const totalAmount = productsWithDetails.reduce((total, product) => total + (product.price * product.quantity), 0);

            const response = await axios.post('http://localhost:8000/api/orders', { userId, productsList: productsWithDetails, totalAmount });
            console.log('Order created:', response.data);
            setProductsList([{ productId: '', price: 0, quantity: 1 }]); // إعادة تعيين القائمة بعد الإرسال
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    const handleProductChange = (index, e) => {
        const values = [...productsList];
        values[index][e.target.name] = e.target.value;
        setProductsList(values);
    };

    const addProduct = () => {
        setProductsList([...productsList, { productId: '', price: 0, quantity: 1 }]);
    };

    return (
        <div className="form-container">
            <h2>Create Order</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="User ID"
                        value={userId}
                        readOnly
                    />
                </div>
                {productsList.map((product, index) => (
                    <div className="input-group" key={index}>
                        <input
                            type="text"
                            name="productId"
                            placeholder="Product Name"
                            value={product.productId}
                            onChange={(e) => handleProductChange(index, e)}
                            required
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={product.price}
                            onChange={(e) => handleProductChange(index, e)}
                            required
                        />
                        <input
                            type="number"
                            name="quantity"
                            placeholder="Quantity"
                            value={product.quantity}
                            onChange={(e) => handleProductChange(index, e)}
                            required
                        />
                    </div>
                ))}
                <button type="button" className="button" onClick={addProduct}>Add Product</button>
                <button type="submit" className="button">Create Order</button>
            </form>
            <h3>Your Orders</h3>
            <ul>
                {orders.map((order) => (
                    <li key={order._id}>
                        Order ID: {order._id}, Total Amount: ${order.totalAmount}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CreateOrder;