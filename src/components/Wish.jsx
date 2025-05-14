import React from 'react';
import { useWishlist } from '../context/WishlistContext'; // ✅ correct hook
import './Cart.css'; // You can rename this to Wish.css for clarity

function Wish() {
  const { wishlist, removeFromWishlist } = useWishlist(); // ✅ correct destructuring

  return (
    <div className="cart-page">
      <h2>Your Wishlist</h2>
      <p>Total Items: {wishlist.length}</p>

      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        wishlist.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} style={{ width: "80px" }} />
            <div>
              <h4>{item.title}</h4>
              <p>${item.price}</p>
              <button onClick={() => removeFromWishlist(item.id)}>Remove</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Wish;
