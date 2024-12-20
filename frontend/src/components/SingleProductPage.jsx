import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleProductPage = ({ currentUser }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));
  const activeUser = currentUser || storedUser;
  const userId = activeUser.user._id;
  const [count, setCount] = useState(1);

  const handlePushInCart = () => {
    fetch(`http://localhost:5000/pushInCart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: userId,   
        productID: id,  
        count,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Product added to cart:", data);
        if (data.success) {
          alert("Product added to cart!");
        } else {
          alert(data.message || "Failed to add product to cart");
        }
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        alert("An error occurred. Please try again.");
      });
  };

  useEffect(() => {
    fetch(`http://localhost:5000/product/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data.product);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setIsLoading(false); 
      });
  }, [id]);

  const increaseCount = () => setCount(count + 1);
  const decreaseCount = () => setCount(count > 1 ? count - 1 : 1);

  if (isLoading) {
    return (
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div>
      {product && (
        <div className="container1">
          <div className="card1">
            <img src={product.image} alt="product" />
          </div>
          <div className="card2">
            <h2>{product.name}</h2>
            <h3>${product.price}</h3>
            <strong>{product.stock} in stock</strong>
            <p>{product.description}</p>
            <div className="quantity-controls">
              <button onClick={decreaseCount}>-</button>
              <span>{count}</span>
              <button onClick={increaseCount}>+</button>
            </div>
            <button onClick={handlePushInCart}>
              <i className="fa-solid fa-bag-shopping"></i> Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProductPage;
