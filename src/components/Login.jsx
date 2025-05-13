import React, { useState } from "react";
import { auth, signInWithEmailAndPassword } from "../firebase"; // Modular API import
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use the modular API for Firebase v9+
      await signInWithEmailAndPassword(auth, email, password); // Correct usage of the modular API
      alert("Login successful");
      // You can add a redirect here, e.g., navigate to another page
      navigate('/');
    } catch (error) {
      console.error("Login error:", error.message); // Log the error for debugging
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>} {/* Show error message */}
    </div>
  );
}
