import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, doc, setDoc, getDocs, deleteDoc, onSnapshot } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const cartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const { currentUser } = useAuth();

  const clearCart = async () => {
  if (!currentUser) {
    setCart([]);
    setTotalItems(0);
    setTotalPrice(0);
    return;
  }

  try {
    const cartRef = collection(db, 'users', currentUser.uid, 'cart');

    // Get all cart items docs for the user
    const cartSnapshot = await getDocs(cartRef);

    // Delete each cart item doc
    const deletePromises = cartSnapshot.docs.map(docSnap => deleteDoc(doc(db, 'users', currentUser.uid, 'cart', docSnap.id)));
    await Promise.all(deletePromises);

    // Clear local state
    setCart([]);
    setTotalItems(0);
    setTotalPrice(0);
  } catch (error) {
    console.error('Error clearing cart:', error);
  }
};


  useEffect(() => {
  if (!currentUser) {
    setCart([]);        // Clear cart
    setTotalItems(0);   // Clear total items
    setTotalPrice(0);   // Clear total price
    return;             // Exit early if user is not logged in
  }

  const cartRef = collection(db, 'users', currentUser.uid, 'cart');

  const unsubscribe = onSnapshot(cartRef, (snapshot) => {
    const cartItems = snapshot.docs.map(doc => doc.data());
    let price = 0;
    cartItems.forEach(item => price += item.price * item.quantity);

    setCart(cartItems);
    setTotalPrice(price);
    setTotalItems(cartItems.length);
  });

  return () => unsubscribe(); // Clean up listener on unmount or user switch
}, [currentUser]);

  const addToCart = async (item) => {
    if (!currentUser) {
      alert('Please log in to add items to your cart.');
      return;
    }

    try {
      const cartRef = collection(db, 'users', currentUser.uid, 'cart');
      const cartItemRef = doc(cartRef, item.id.toString());  // har item ko distingusish krne ke liye item.id
      await setDoc(cartItemRef, { ...item, quantity: item.quantity || 1 });

      // refresh hone pr cheeze remain asusual isliye onSnapshot use kiya
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (itemId) => {
    if (!currentUser) return;

    try {
      const cartRef = collection(db, 'users', currentUser.uid, 'cart');
      const cartItemRef = doc(cartRef, itemId.toString());  // firse itemid use kiya diff krne ke liye
      await deleteDoc(cartItemRef);

    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  return (
    <cartContext.Provider value={{ cart, totalPrice, totalItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </cartContext.Provider>
  );
}

export const useCart = () => useContext(cartContext);
