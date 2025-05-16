// src/components/AddressForm.jsx
import { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import "./AddressForm.css"; // ✅ Import the CSS

function AddressForm() {
  const { currentUser } = useAuth();
  const [address, setAddress] = useState({
    street: "",
    city: "",
    pincode: "",
    country: ""
  });

  // Fetch existing address on mount
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

  return (
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
  );
}

export default AddressForm;
