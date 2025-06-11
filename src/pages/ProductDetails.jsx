import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/Cartcontext"; // ✅ import
import { Link } from "react-router-dom";
import "./ProductDetails.css";

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [pin, setPin] = useState("");
  const [deliveryMsg, setDeliveryMsg] = useState("");

  const { addToCart } = useCart(); // ✅ access cart context

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        const found = data.find((item) => item.id === parseInt(productId));
        setProduct(found);
      });
  }, [productId]);

  const checkDelivery = () => {
    if (pin.length === 6 && /^[0-9]{6}$/.test(pin)) {
      setDeliveryMsg("Delivery available ✅");
    } else {
      setDeliveryMsg("Invalid pin ❌");
    }
  };

  if (!product) return <p>Loading...</p>;

  const similar = allProducts.filter(
    (item) => item.category === product.category && item.id !== product.id
  );

  return (
    <div className="product-detail-container">
      <div className="grid-layout">
        {/* Thumbnails */}
        <div className="thumbs">
          <img src={product.image} alt="thumb" className="thumb-img" />
        </div>

        {/* Main Image */}
        <div className="main-image">
          <img src={product.image} alt={product.title} className="main-img" />
        </div>

        {/* Product Info */}
        <div className="info">
          <h2>{product.title}</h2>
          <p className="price">₹{product.price}</p>
          <p className="desc">{product.description}</p>
          <input
            type="text"
            placeholder="Enter pin"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
          <button onClick={checkDelivery}>Check</button>
          <p className="delivery-msg">{deliveryMsg}</p>
        </div>

        {/* Action Buttons */}
        <div className="actions">
          <button className="buy-btn">Buy Now</button>
          <button
            className="cart-btn"
            onClick={() =>
              addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1,
              })
            }
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h3>Customer Reviews</h3>
        <p>⭐⭐⭐⭐☆ - “Really good quality and fast delivery!”</p>
        <p>⭐⭐⭐☆☆ - “Decent product for the price.”</p>
      </div>

      {/* Similar Products Section */}
      <div className="similar-section">
        <h3>Similar Products</h3>
        <div className="similar-products">
          {similar.slice(0, 4).map((item) => (
            <Link to={`/product/${item.id}`} key={item.id} className="similar-card">
              <img src={item.image} alt={item.title} />
              <p>{item.title.slice(0, 40)}...</p>
              <p>₹{item.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
