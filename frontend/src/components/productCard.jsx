import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./ProductCard.css";
import SvgRating from "./SvgRating";

function ProductCard({ product, setCartItems, cartItems }) {
  // Custom SVG Rating Component

  return (
    <Link to={`/product/${product._id}`}
      className="card"
    
    >
      <img
        src={product.image}
        className="card-img"
        alt={product.title}
        onError={(e) => {
          e.target.src = "/default-product-img.png";
        }}
      />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">{product.description}</p>

        {/* SVG Rating Component */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <SvgRating value={product.rate?.average} />
          <h6>by {product.rate?.usersCount} users</h6>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            margin: "5px",
          }}
        >
          <h3>{product.price}</h3>
          <h5>$</h5>
        </div>
        <button
          className="card-button"
          onClick={(e) => {
            e.stopPropagation();
            setCartItems([...cartItems, product]);
          }}
        >
          Add to cart
        </button>
      </div>
    </Link>
  );
}

export default ProductCard;
