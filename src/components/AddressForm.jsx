import { useState, useEffect } from "react";
import { doc, setDoc, getDoc, addDoc, collection, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import "./AddressForm.css";

function AddressForm() {
  const { currentUser } = useAuth();
  const [address, setAddress] = useState({
    street: "",
    city: "",
    pincode: "",
    country: ""
  });

  const [summary, setSummary] = useState(null);

  // Fetch address on mount
  useEffect(() => {
    const fetchAddress = async () => {
      if (!currentUser) return;
      const userRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists() && docSnap.data().address) {
        setAddress(docSnap.data().address);
      }
    };
    fetchAddress();
  }, [currentUser]);

  // Load order summary from localStorage
  useEffect(() => {
    const savedSummary = JSON.parse(localStorage.getItem("orderSummary"));
    if (savedSummary) setSummary(savedSummary);
  }, []);

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(userRef, { address }, { merge: true });
    alert("Address updated successfully!");
  };

  const handlePlaceOrder = async () => {
    if (!currentUser || !summary) return;

    try {
      // 1. Save order to Firestore
      const orderRef = collection(db, "users", currentUser.uid, "orders");
      await addDoc(orderRef, {
        ...summary,
        address,
        createdAt: new Date()
      });

      // 2. Clear cart in Firestore
      const cartRef = collection(db, "users", currentUser.uid, "cart");
      const cartItems = await getDocs(cartRef);
      cartItems.forEach(async (item) => {
        await deleteDoc(doc(cartRef, item.id));
      });

      // 3. Clear localStorage & show confirmation
      localStorage.removeItem("orderSummary");
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="address-page">
      <form onSubmit={handleSubmit} className="address-form">
        <h2 className="address-heading">Update Address</h2>

        <input
          name="street"
          placeholder="Street"
          value={address.street}
          onChange={handleChange}
          className="address-input"
          required
        />

        <input
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleChange}
          className="address-input"
          required
        />

        <input
          name="pincode"
          placeholder="Pincode"
          value={address.pincode}
          onChange={handleChange}
          className="address-input"
          required
        />

        <input
          name="country"
          placeholder="Country"
          value={address.country}
          onChange={handleChange}
          className="address-input"
          required
        />

        <button type="submit" className="address-button">Save Address</button>
      </form>

      {summary && (
        <div className="order-summary">
          <h3>Order Summary</h3>
          {summary.cart.map((item, idx) => (
            <div key={idx}>
              <p>{item.title} - ₹{item.price} × {item.quantity}</p>
            </div>
          ))}
          <strong>Total: ₹{summary.totalPrice.toFixed(2)}</strong>

          <button className="place-order-button" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}

export default AddressForm;
