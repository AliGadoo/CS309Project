import React, { useState } from 'react';
import './OrderPage.css'; // استيراد ملف CSS

function OrderPage() {
  const [quantity, setQuantity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا يمكن إرسال البيانات إلى الخادم أو معالجتها
    console.log({ quantity, phoneNumber, address });
  };

  return (
    <div className="order-container">
      <h1>Order Page</h1>
      <p>Your order has been placed successfully!</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
}

export default OrderPage;

