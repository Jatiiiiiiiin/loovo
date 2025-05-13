import React from 'react';
import { useCart } from '../context/Cartcontext';
import './Cart.css';
function Cart() {
  const { cart, totalPrice, totalItems, removeFromCart } = useCart();

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <p>Total Items: {totalItems}</p>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} style={{ width: "80px" }} />
            <div>
              <h4>{item.title}</h4>
              <p>${item.price}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
        ))
      )}
      <button id="buy">Proceed to Payment</button>
    </div>
  );
}

export default Cart;
