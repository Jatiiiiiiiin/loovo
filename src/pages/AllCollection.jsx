import React from 'react'
import "./men.css"
import { useEffect, useState } from 'react'
import { useCart } from '../context/Cartcontext';
import { useWishlist } from '../context/WishlistContext'; // Import the Wishlist context


function AllCollection() {
  //https://fakestoreapi.com/products
  const [products, setProducts] = useState([]);
  const {addToCart} = useCart();
  const {addToWishlist, removeFromWishlist, isInWishlist} = useWishlist(); // Import the Wishlist context

  const toggleWishlist = (product)=>{
    if(isInWishlist(product.id)){
      removeFromWishlist(product.id);
    }else{
      addToWishlist(product);
    }
  };

  useEffect(() => {
      fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => {
          const allClothing = data;
          setProducts(allClothing);
        });
    }, []);

  return (
    <>
      <div className="product">
        <h2>Total Products: {products.length}</h2>
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
                  id: product.id, // id ko product.id bana diya taki code me dikkat na ho
                  title: product.title,
                  price: product.price,
                  image: product.image,
                  quantity: 1, // default quantity of 1
                })}>Add to Cart</button>

                <button
                  className={`heart-button ${isInWishlist(product.id) ? 'liked' : ''}`}
                  onClick={() => toggleWishlist(product)}
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

export default AllCollection
