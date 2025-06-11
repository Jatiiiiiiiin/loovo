import React from 'react'
import "./men.css"
import { useEffect, useState } from 'react'
import { useCart } from '../context/Cartcontext';
import { useWishlist } from '../context/WishlistContext'; // Import the Wishlist context
import { Link } from 'react-router-dom';
function Women() {
  //https://fakestoreapi.com/products
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();;

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        const womensClothing = data.filter(item => item.category === "women's clothing");
        setProducts(womensClothing);
      });
  }, []);
  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <>
      <div className="product">
        <h2>Total Women's Products: {products.length}</h2>
      </div>
      <div className="containerr">
        {products.map(product => (
          <div className="box" key={product.id}>
            <div className="content">
              <Link to={`/product/${product.id}`} className="product-link">
                <div className="image">
                  <img src={product.image} alt={product.title} />
                </div>
              </Link>

              <div className="text">
                <h1>{product.title}</h1>
                <p>${product.price}</p>
                <div className="btn-group">
                  <button
                    onClick={() => addToCart({
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      image: product.image,
                      quantity: 1,
                    })}
                  >
                    Add to Cart
                  </button>

                  <button
                    className={`heart-button ${isInWishlist(product.id) ? 'liked' : ''}`}
                    onClick={() => toggleWishlist(product)}
                  >
                    {isInWishlist(product.id) ? '❤️' : '♡'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Women;
