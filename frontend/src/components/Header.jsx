import React from "react";
import { useCart } from "../context/CartContext";

export default function Header({ onUser, onCart }) {
  const { count } = useCart();

  return (
    <header>
      <div className="logo"><h1>ShopEase</h1></div>
      <nav>
        <ul>
          <li><a href="#" className="active">Home</a></li>
          <li><a href="#products">Products</a></li>
          {/* <li><a href="#about">About</a></li> */}
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <div className="icons">
        <div className="fas fa-user" onClick={onUser}></div>
        <div className="fas fa-shopping-cart" onClick={onCart}>
          <span id="cart-count">{count}</span>
        </div>
        <div id="menu-btn" className="fas fa-bars"></div>
      </div>
    </header>
  );
}
