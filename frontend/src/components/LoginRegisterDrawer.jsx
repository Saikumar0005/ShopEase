import React, { useState } from "react";
import api from "../api";

export default function LoginRegisterDrawer({ active, onClose, onAuth }) {
  const [mode, setMode] = useState("login"); // or "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setError(null);
    try {
      const path = mode === "signup" ? "/api/auth/signup" : "/api/auth/login";
      const body = mode === "signup" ? { name, email, password } : { email, password };
      const res = await api.post(path, body);
      // Expect backend to return { token, user }
      const data = res.data;
      if (data?.token) {
        onAuth?.(data); // caller should store token, setAuthToken, setUser
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  }

  if (!active) return null;
  return (
    <div className="drawer">
      <button onClick={onClose}>Close</button>
      <h3>{mode === "signup" ? "Sign up" : "Login"}</h3>
      <form onSubmit={submit}>
        {mode === "signup" && (
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
        )}
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
        <button type="submit">{mode === "signup" ? "Sign up" : "Login"}</button>
      </form>
      {error && <div className="error">{error}</div>}
      <button onClick={() => setMode(mode === "signup" ? "login" : "signup")}>
        Switch to {mode === "signup" ? "Login" : "Sign up"}
      </button>
    </div>
  );
}
