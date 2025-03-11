// import React from "react";

// const Cart = ({ cart, setCart, placeOrder }) => {
//     const removeFromCart = (productId) => {
//         setCart(cart.filter(item => item.productId !== productId));
//     };

//     const updateQuantity = (productId, quantity) => {
//         setCart(cart.map(item => 
//             item.productId === productId ? { ...item, quantity } : item
//         ));
//     };

//     return (
//         <div>
//             <h2>🛒 سلة التسوق</h2>
//             {cart.length === 0 ? <p>السلة فارغة</p> : (
//                 <div>
//                     {cart.map(item => (
//                         <div key={item.productId} style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
//                             <h4>{item.name}</h4>
//                             <p>السعر: {item.price} دينار</p>
//                             <input type="number" value={item.quantity} min="1" onChange={(e) => updateQuantity(item.productId, Number(e.target.value))} />
//                             <button onClick={() => removeFromCart(item.productId)}>❌ إزالة</button>
//                         </div>
//                     ))}
//                     <button onClick={placeOrder}>✔ إتمام الطلب</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Cart;
