import React from 'react';
import './ProductCard.css'; // ملف CSS مخصص

function ProductCard(props) {
  const { product } = props;
  console.log(props);

  return (
    <div className="card">
      <img src={product.image} className="card-img" alt={product.title} />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">{product.description}</p>
        <button className="card-button">Order Now</button>
      </div>
    </div>
  );
}

export default ProductCard;
