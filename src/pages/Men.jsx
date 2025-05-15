import React, { useEffect, useState } from 'react';
import { useCart } from '../context/Cartcontext';
import { useWishlist } from '../context/WishlistContext'; // 👈 Add this
import './men.css';

function Men() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist(); // 👈 Use these

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        const mensClothing = data.filter(item => item.category === "men's clothing");
        setProducts(mensClothing);
      });
  }, []);

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {  //check ke product already wishlist me hai ya nahi
      removeFromWishlist(product.id); //agr hai to remove kar do
    } else {
      addToWishlist(product); //agr nahi hai to add kar do
    }
  };

  return (
    <>
      <div className="product">
        <h2>Total Men's Products: {products.length}</h2>
      </div>
      <div className="containerr">
        {products.map(product => (
          <div className="box" key={product.id}>
            <div className="content">
              <div className="image">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="text">
                <h1>{product.title}</h1>
                <p>${product.price}</p>
                <button onClick={() => addToCart({
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  image: product.image,
                  quantity: 1,
                })}>Add to Cart</button>

                <button
                  className={`heart-button ${isInWishlist(product.id) ? 'liked' : ''}`} //ternary operator jisse pata chalega ki product wishlist me hai ya nahi
                  onClick={() => toggleWishlist(product)} //toggleWishlist function ko call karne ke liye
                >
                  {isInWishlist(product.id) ? '❤️' : '♡'} 
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Men;
