import React from "react";
import { useCart } from "../context/CartContext";

export default function CartDrawer({ active, onClose, onCheckout }) {
  const { cart, removeFromCart, total } = useCart();

  return (
    <div className={`cart-container ${active ? "active" : ""}`}>
      <div id="close-cart-btn" className="fas fa-times" onClick={onClose}></div>
      <h3 className="cart-title">Your Cart</h3>

      <div className="cart-content">
        {cart.length === 0 ? (
          <p style={{ padding: "1rem" }}>Cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-box">
              <img src={item.image} alt={item.name} />
              <div className="detail">
                <h3>{item.name}</h3>
                <div className="price">₹{item.price}</div>
                <div className="quantity">Qty: {item.quantity}</div>
              </div>
              <i
                className="fas fa-trash"
                onClick={() => removeFromCart(item.id)}
              ></i>
            </div>
          ))
        )}
      </div>

      <div className="cart-total">
        <h3>
          Total: ₹<span id="cart-total">{total.toFixed(2)}</span>
        </h3>
        <button className="btn" id="checkout-btn" onClick={onCheckout}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
