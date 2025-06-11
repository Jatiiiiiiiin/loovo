import React, { useEffect, useState } from 'react';
import { useCart } from '../context/Cartcontext';
import { useWishlist } from '../context/WishlistContext';
import { Link } from 'react-router-dom';
import './men.css';

function Men() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        const mensClothing = data.filter(item => item.category === "men's clothing");
        setProducts(mensClothing);
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
        <h2>Total Men's Products: {products.length}</h2>
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

export default Men;
