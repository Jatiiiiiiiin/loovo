import React from "react";
import { useCart } from "../context/Cartcontext";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handlePayment = async () => {
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const options = {
      key: "rzp_test_jhCWQoAR1ZFQsU", // Replace with your Razorpay key
      amount: totalAmount * 100, // in paise
      currency: "INR",
      name: "LOOVO",
      description: "Test Transaction",
      handler: async function (response) {
        const paymentId = response.razorpay_payment_id;

        // Save the order in Firestore
        const orderRef = collection(db, "users", currentUser.uid, "orders");
        await addDoc(orderRef, {
          products: cartItems,
          total: totalAmount,
          paymentId: paymentId,
          createdAt: Timestamp.now(),
        });

        clearCart();
        alert("Payment Successful! Order Placed.");
        navigate("/profile");
      },
      prefill: {
        name: currentUser?.displayName || "Customer",
        email: currentUser?.email,
      },
      theme: {
        color: "#000",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Checkout</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.title} - ₹{item.price} × {item.quantity}
          </li>
        ))}
      </ul>
      <h3>Total: ₹{cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}</h3>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}

export default Checkout;
