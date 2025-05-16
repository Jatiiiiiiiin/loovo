
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import AddressForm from "../components/AddressForm";
import "./Profile.css";
function Profile() {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) return;
      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUserData(userSnap.data());
      }
    };

    const fetchOrders = async () => {
      if (!currentUser) return;
      const ordersRef = collection(db, "users", currentUser.uid, "orders");
      const orderSnap = await getDocs(ordersRef);
      const orderList = orderSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(orderList);
    };

    fetchUserData();
    fetchOrders();
  }, [currentUser]);

  if (!currentUser) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
  <div className="profile-container">
    <h1 className="profile-header">👤 Profile</h1>

    {userData && (
      <div className="profile-info">
        <p><strong>Name:</strong> {userData.name || "N/A"}</p>
        <p><strong>Email:</strong> {currentUser.email}</p>
      </div>
    )}

    <hr />
    <h1>ADDRESS</h1>
    <AddressForm />

    <hr />

    <div className="orders-section">
      <h2>📦 Orders</h2>
      {orders.length > 0 ? (
        <ul className="orders-list">
          {orders.map((order) => (
            <li key={order.id}>
              <strong>Order #{order.id}:</strong> {order.itemName || "No name"} — ₹{order.total || 0}
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders placed yet.</p>
      )}
    </div>
  </div>
);
}

export default Profile;
