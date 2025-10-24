import React, { useState } from "react";
import { useCart } from "../context/CartContext";

export default function PaymentDrawer({ active, onClose }) {
  const { cart, total, clearCart } = useCart();
  const [method, setMethod] = useState("credit-card");

  function handlePay(e) {
    e.preventDefault();
    alert("Payment successful (dummy)");
    clearCart();
    onClose();
  }

  return (
    <div className={`payment-container ${active ? "active" : ""}`}>
      <div
        id="close-payment-btn"
        className="fas fa-times"
        onClick={onClose}
      ></div>
      <h3 className="payment-title">Payment Details</h3>

      <form id="payment-form" onSubmit={handlePay}>
        <div className="payment-methods">
          <h4>Select Payment Method</h4>
          <div className="method">
            <input
              type="radio"
              checked={method === "credit-card"}
              onChange={() => setMethod("credit-card")}
            />{" "}
            <label>Credit/Debit Card</label>
          </div>
          <div className="method">
            <input
              type="radio"
              checked={method === "upi"}
              onChange={() => setMethod("upi")}
            />{" "}
            <label>UPI</label>
          </div>
          <div className="method">
            <input
              type="radio"
              checked={method === "net-banking"}
              onChange={() => setMethod("net-banking")}
            />{" "}
            <label>Net Banking</label>
          </div>
          <div className="method">
            <input
              type="radio"
              checked={method === "cod"}
              onChange={() => setMethod("cod")}
            />{" "}
            <label>Cash on Delivery</label>
          </div>
        </div>

        {method === "credit-card" && (
          <div id="card-details">
            <div className="form-group">
              <label>Card Number</label>
              <input required />
            </div>
            <div className="form-group">
              <label>Name on Card</label>
              <input required />
            </div>
            <div className="form-group-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input required />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input required />
              </div>
            </div>
          </div>
        )}

        {method === "upi" && (
          <div id="upi-details">
            <div className="form-group">
              <label>UPI ID</label>
              <input required />
            </div>
          </div>
        )}

        {method === "net-banking" && (
          <div id="net-banking-details">
            <div className="form-group">
              <label>Select Bank</label>
              <select required>
                <option value="">Select your bank</option>
                <option value="sbi">State Bank of India</option>
                <option value="hdfc">HDFC Bank</option>
              </select>
            </div>
          </div>
        )}

        <div className="order-summary">
          <h4>Order Summary</h4>
          <div className="summary-items">
            {cart.map((item) => (
              <div key={item.id} className="summary-item">
                {item.name} x {item.quantity}{" "}
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <p>
              Total: <span id="payment-total">₹{total.toFixed(2)}</span>
            </p>
          </div>
        </div>

        <button className="btn" id="pay-now-btn" type="submit">
          Pay Now
        </button>
      </form>
    </div>
  );
}
