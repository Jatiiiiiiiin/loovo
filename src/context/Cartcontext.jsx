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

  useEffect(() => {
    if (currentUser) {
      // jab user login hoga to real time products to fetch krega
      const cartRef = collection(db, 'users', currentUser.uid, 'cart');
      const unsubscribe = onSnapshot(cartRef, (snapshot) => {
        const cartItems = snapshot.docs.map(doc => doc.data());
        let price = 0;
        cartItems.forEach(item => price += item.price * item.quantity);
        setCart(cartItems);
        setTotalPrice(price);
        setTotalItems(cartItems.length);
      });

      // agar change karunga ya remove karunga to iska kya hoga
      return () => unsubscribe();
    }
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
    <cartContext.Provider value={{ cart, totalPrice, totalItems, addToCart, removeFromCart }}>
      {children}
    </cartContext.Provider>
  );
}

export const useCart = () => useContext(cartContext);
