import React, { useEffect, useState } from "react";

const Products = ({ addToCart }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/products") // غيّر الرابط حسب الـ API الخاص بك
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2>قائمة المنتجات</h2>
            <div>
                {products.map(product => (
                    <div key={product._id} style={{ border: "1px solid #ddd", padding: "10px", margin: "10px" }}>
                        <h3>{product.name}</h3>
                        <p>السعر: {product.price} دينار</p>
                        <button onClick={() => addToCart(product)}>إضافة إلى السلة</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
