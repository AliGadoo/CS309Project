import { useEffect, useState } from "react";
import ProductCard from "./productCard";
import "./productsList.css";


function ProductList() {
  const api_url = "http://localhost:5000/allProducts";
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(api_url)
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
      
  }, []);

  return (
    <>
      <h2 className="section-title">Our Products</h2>
      {products && (
        <div className="product-container">
          {products.map((product) => (
            <div className="product-item" key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ProductList;
