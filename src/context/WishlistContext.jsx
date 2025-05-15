import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase"; // adjust path as needed
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { currentUser } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from Firestore when user logs in
  useEffect(() => {
  if (!currentUser) {
    setWishlist([]); // ✅ Clear wishlist on logout
    return;
  }

  const fetchWishlist = async () => {
    try {
      const docRef = doc(db, "wishlists", currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setWishlist(docSnap.data().items || []);
      } else {
        setWishlist([]);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  fetchWishlist();
}, [currentUser]);

  const saveWishlist = async (updatedWishlist) => {
    if (!currentUser) {
      alert("Please log in to save your wishlist.");
      return;
    }
    try {
    const docRef = doc(db, "wishlists", currentUser.uid);
    await setDoc(docRef, { items: updatedWishlist });
  } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
  const addToWishlist = (item) => {
    const exists = wishlist.find((i) => i.id === item.id);
    if (exists) return;
    const updated = [...wishlist, item];
    setWishlist(updated);
    saveWishlist(updated);
  };

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    saveWishlist(updated);
  };

  const isInWishlist = (id) => {
    return wishlist.some((item) => item.id === id);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
