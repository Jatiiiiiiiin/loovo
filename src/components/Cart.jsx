import React from 'react';
import { useCart } from '../context/Cartcontext';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

function Cart() {
  const { cart, totalPrice, totalItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleProceedToPayment = async () => {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  if (!currentUser) {
    alert("Please log in to place an order.");
    return;
  }

  const orderId = uuidv4();  // safer UUID generation
  const orderRef = doc(db, "users", currentUser.uid, "orders", orderId);

  const orderData = {
    date: serverTimestamp(),
    products: cart.map(item => ({
      id: item.id,
      title: item.title,
      image: item.image,
      quantity: item.quantity,
      price: item.price,
    })),
    total: totalPrice,
    status: "Processing",
    trackingId: `TRK-${Math.floor(Math.random() * 1000000)}`,
  };

  try {
    await setDoc(orderRef, orderData);
    clearCart();
    alert("✅ Order placed successfully!");
    navigate(`/order/${orderId}`);
  } catch (error) {
    console.error("Error placing order:", error);
    alert("❌ Error placing order: " + error.message);
  }
};
  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <p>Total Items: {totalItems}</p>
      <p>Total Price: ₹{totalPrice.toFixed(2)}</p>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} style={{ width: "80px" }} />
            <div>
              <h4>{item.title}</h4>
              <p>₹{item.price}</p>
              <p>Qty: {item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
        ))
      )}

      <button id="buy" onClick={handleProceedToPayment}>
        Proceed to Payment
      </button>
    </div>
  );
}

export default Cart;
