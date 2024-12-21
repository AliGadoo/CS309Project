import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./ProductCard.css";
import SvgRating from "./SvgRating";

function ProductCard({ product, setCartItems, cartItems }) {
  const [count, setCount] = useState(1);

  const increaseCount = () => setCount(count + 1);
  const decreaseCount = () => setCount(count > 1 ? count - 1 : 1);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    const productWithCount = { ...product, count };
    setCartItems([...cartItems, productWithCount]);
  };

  return (
    <div className="card">
      { }
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          className="card-img"
          alt={product.title}
          onError={(e) => {
            e.target.src = "/default-product-img.png";
          }}
        />
      </Link>

      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            margin: "5px",
          }}
        >
          <h3>{product.price}</h3>
          <h5>$</h5>
        </div>

        { }
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center"
          }}
        >
          <SvgRating value={product.rate?.average} />
          <h6>by {product.rate?.usersCount} users</h6>
        </div>

        { }
        <div className="quantity-controls">
          <i className="fa-solid fa-minus" onClick={decreaseCount}></i>
          <strong>{count}</strong>
          <i className="fa-solid fa-plus" onClick={increaseCount}></i>
        </div>

        <div className="card-button-container">
          <button
            className="card-button"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
