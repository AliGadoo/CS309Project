import { useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";

const SingleProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoding] = useState(false);
  useEffect(() => {
    fetch(`http://localhost:5000/product/${id}`)
      .then((Response) => {
        setIsLoding(true);
        return Response.json();
      })
      .then((data) => {
        setProduct(data.product);
        setIsLoding(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (isLoading) {
    return (
      <div className="looder1">
        <span className="loader"></span>
      </div>
    );
  }
  console.log(product);
  return (
    <div>
      {product && (
        <div className="container1">
          <div className="card1">
            <img src={product.image} alt="product" />
          </div>
          <div className="card2">
            <h2>{product.name}</h2>
            <h3>${[product.price]}</h3>
            <strong>{product.stock} in stock</strong>
            <p>{product.description}</p>
            <button><i class="fa-solid fa-bag-shopping"></i>add to card</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProductPage;
