import React from "react";
import { useNavigate , Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard(props) {
  const { product } = props;
  const navigate = useNavigate();

  const handleOrderNow = () => {
    navigate("/login");
  };

  return (
    <Link className="card" to={`/product/${product._id}`} >
      <img
        src={product.image}
        className="card-img"
        alt={product.title}
        onError={(e) => {
          e.target.src = "/default-product-img.png";
        }}
      />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <h4 className="card-title">${product.price}</h4>
        <p className="card-text">{product.description}</p>
        <button className="card-button" onClick={handleOrderNow}>
          Order Now
        </button>
      </div>
    </Link>
  );
}

export default ProductCard;
