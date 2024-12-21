import { useEffect, useState } from "react";
import { useParams , useNavigate } from "react-router-dom";
import SvgRating from "./SvgRating";

const SingleProductPage = ({ currentUser }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));
  const activeUser = currentUser || storedUser;
  const userId = activeUser.user._id;
  const [count, setCount] = useState(1);
  const [successMessage, setSuccessMessage] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(""); 

  const navigate = useNavigate();

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
          setSuccessMessage("Product added to cart!"); 
          setTimeout(() => {
            setSuccessMessage("");
            navigate("/cart");
          }, 2000); 
          
        } else {
          setErrorMessage(data.message || "Failed to add product to cart"); 
          setTimeout(() => setErrorMessage(""), 2000); 
        }
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        setErrorMessage("An error occurred. Please try again."); 
        setTimeout(() => setErrorMessage(""), 2000); 
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
if (successMessage ){
return (
  <div>
    <div style={{ 
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "green",
      color: "white",
      fontSize: "2rem",
    }}>{successMessage}</div>
  </div>
)
}
else if (errorMessage){
  return (
    <div>
      <div style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "red",
          color : "white",
          fontSize: "2rem",
          zIndex: 9999,
        }}>{errorMessage}</div>
    </div>
  )
}
  

 else return (
    <div>
      {product && (
        <div className="container1">
          <div className="card1">
            <img src={product.image} alt="product" />
          </div>
          <div className="card2">
            <h2>{product.name}</h2>
            <h3>${product.price}</h3>
            <h4>{product.stock} in stock</h4>
            <p>{product.description}</p>
            <div className="quantity-controls">
              <i className="fa-solid fa-minus" onClick={decreaseCount}></i>
              <strong>{count}</strong>
              <i className="fa-solid fa-plus" onClick={increaseCount}></i>
            </div>
            <button onClick={handlePushInCart}>
              <i className="fa-solid fa-bag-shopping"></i> Add to Cart
            </button>
          </div>
          <div className="rate">
            
        
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProductPage;
