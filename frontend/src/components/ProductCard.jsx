import React from "react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-box">
      {product.discount && <span className="discount">{product.discount}</span>}
      <div className="image"><img src={product.image} alt={product.name} /></div>
      <div className="content">
        <h3>{product.name}</h3>
        <div className="stars">
          <i className="fas fa-star"></i><i className="fas fa-star"></i>
          <i className="fas fa-star"></i><i className="fas fa-star"></i>
          <i className="far fa-star"></i>
        </div>
        <div className="price">
          ₹{product.price}
          {product.discount && (
            <span>₹{(product.price * (1 + parseFloat(product.discount) / 100)).toFixed(2)}</span>
          )}
        </div>
        <button onClick={() => addToCart(product)} className="btn">Add to cart</button>
      </div>
    </div>
  );
}
