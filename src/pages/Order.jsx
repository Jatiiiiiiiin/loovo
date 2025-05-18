import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "./Order.css";

function Order() {
  const { currentUser } = useAuth();
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!currentUser || !orderId) {
        setLoading(false);
        return;
      }

      const orderRef = doc(db, "users", currentUser.uid, "orders", orderId);
      const orderSnap = await getDoc(orderRef);

      if (orderSnap.exists()) {
        setOrderData(orderSnap.data());
      } else {
        setOrderData(null);
      }

      setLoading(false);
    };

    fetchOrder();
  }, [currentUser, orderId]);

  const handleCancelOrder = async () => {
  const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
  if (!confirmCancel) return;

  setIsCancelling(true);
  try {
    const orderRef = doc(db, "users", currentUser.uid, "orders", orderId);
    await updateDoc(orderRef, { status: "Refund Initiated" });
    setOrderData(prev => ({ ...prev, status: "Refund Initiated" }));
    alert("Your order has been cancelled. Refund initiated.");
  } catch (error) {
    console.error("Error cancelling order:", error);
    alert("Failed to cancel order. Please try again.");
  }
  setIsCancelling(false);
};

  
  if (loading) return <p>Loading order details...</p>;
  if (!orderData) return <p>Order not found.</p>;

  const { date, products = [], total = 0, status, trackingId } = orderData;

  const formattedDate = date?.toDate
    ? date.toDate().toLocaleString()
    : date
      ? new Date(date).toLocaleString()
      : "N/A";

  return (
    <div className="order-detail-container">
      <h1>🧾 Order #{orderId}</h1>
      <p><strong>Placed on:</strong> {formattedDate}</p>
      <p><strong>Status:</strong> {status || "Processing"}</p>
      <p><strong>Tracking ID:</strong> {trackingId || "N/A"}</p>

      <h2>🛒 Order Summary</h2>
      {products.length > 0 ? (
        <div className="order-products">
          {products.map((item, index) => (
            <div className="order-product-card" key={index}>
              <img src={item.image} alt={item.title} />
              <div>
                <p><strong>{item.title}</strong></p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ₹{item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found in this order.</p>
      )}

      <h3>Total: ₹{total.toFixed(2)}</h3>
      <h3>
        Payment Status: {
          status === "Paid" ? "✅ Paid" :
            status === "Refund Initiated" ? "🔄 Refund Initiated" :
              "❌ Unpaid"
        }
      </h3>
      <h3>Delivery Status: {status === "Delivered" ? "✅ Delivered" : "🚚 In Transit"}</h3>

      {/* Show cancel button only if order is not already cancelled */}
      {status !== "Cancelled" && status !== "Refund Initiated" &&(
        <button
          className="cancel-btn"
          onClick={handleCancelOrder}
          disabled={isCancelling}
        >
          {isCancelling ? "Cancelling..." : "❌ Cancel Order"}
        </button>
      )}

      <button onClick={() => navigate(-1)} className="back-btn">🔙 Back</button>
    </div>
  );
}

export default Order;
