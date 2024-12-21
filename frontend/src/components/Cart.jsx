import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Cart.css'; // Import the CSS file

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    const activeUser = currentUser || storedUser;
    const userId = activeUser ? activeUser.user._id : null;

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch(`http://localhost:5000/getCart/${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();
                if (data.success) {
                    setCart(data.cart);
                } else {
                    setErrorMessage(data.message || "Failed to fetch cart");
                    setTimeout(() => setErrorMessage(""), 2000);
                }
            } catch (error) {
                console.error("Error fetching cart:", error);
                setErrorMessage("An error occurred. Please try again.");
                setTimeout(() => setErrorMessage(""), 2000);
            }
        };

        if (userId) {
            fetchCart();
        }
    }, [userId]);

    const handleRemoveFromCart = async (productID) => {
        try {
            const response = await fetch(`http://localhost:5000/deleteFromCart`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userID: userId,
                    productID,
                }),
            });

            const data = await response.json();
            if (data.success) {
                setCart(data.cart);
            } else {
                setErrorMessage(data.message || "Failed to remove from cart");
                setTimeout(() => setErrorMessage(""), 2000);
            }
        } catch (error) {
            console.error("Error removing from cart:", error);
            setErrorMessage("An error occurred. Please try again.");
            setTimeout(() => setErrorMessage(""), 2000);
        }
    };

    const handleQuantityChange = (productID, change) => {
        setCart((prevCart) =>
            prevCart.map((product) =>
                product.productID._id === productID
                    ? { ...product, count: product.count + change }
                    : product
            )
        );
    };

    return (
        <div className="cart-container">
            <Link to="/" className="home-link">
                <i className="fa fa-home" aria-hidden="true"></i> Home
            </Link>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {cart.length === 0 ? (
                <p className="empty-cart-message">Your cart is empty.</p>
            ) : (
                cart.map((product) => (
                    <div key={product._id} className="cart-item">
                        <p className="product-name">{product.productID.name}</p>
                        <p className="product-price">${product.productID.price.toFixed(2)}</p>
                        <div className="quantity-controls">
                            <p className="product-quantity">Quantity: {product.count}</p>
                        </div>
                        <button
                            onClick={() => handleRemoveFromCart(product.productID._id)}
                            className="remove-button"
                        >
                            Remove
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}
