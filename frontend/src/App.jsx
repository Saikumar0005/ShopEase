import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import LoginRegisterDrawer from "./components/LoginRegisterDrawer";
import PaymentDrawer from "./components/PaymentDrawer";
import api, { setAuthToken } from "./api";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  // restore user from localStorage on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      api
        .get("/auth/me")
        .then((res) => setUser(res.data.user))
        .catch(() => {
          // invalid token
          localStorage.removeItem("token");
          setAuthToken(null);
          setUser(null);
        });
    }
  }, []);

  const [user, setUser] = useState(null);

  return (
    <>
      {/* Pass user and a toggle: if user exists, clicking could log out */}
      <Header
        user={user}
        onUser={() => (user ? setUser(null) : setShowLogin(true))}
        onCart={() => setShowCart(true)}
      />
      <Hero />
      <Products />
      <Contact />
      <Footer />

      <LoginRegisterDrawer
        active={showLogin}
        onClose={() => setShowLogin(false)}
        onAuth={(data) => {
          // expected data = { token, user }
          if (data?.token) {
            localStorage.setItem("token", data.token);
            setAuthToken(data.token);
          }
          setUser(data.user || null);
          setShowLogin(false);
        }}
      />
      <CartDrawer
        active={showCart}
        onClose={() => setShowCart(false)}
        onCheckout={() => {
          setShowCart(false);
          setShowPayment(true);
        }}
      />
      <PaymentDrawer active={showPayment} onClose={() => setShowPayment(false)} />
    </>
  );
}
