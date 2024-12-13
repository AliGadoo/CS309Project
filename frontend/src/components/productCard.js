import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './ProductCard.css'; 

function ProductCard(props) {
  const { product } = props;
  const navigate = useNavigate(); 

  const handleOrderNow = () => {
    navigate('/login'); 
  };

  return (
    <div className="card">
      <img src={product.image} className="card-img" alt={product.title} />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">{product.description}</p>
        <button className="card-button" onClick={handleOrderNow}>
          Order Now
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

