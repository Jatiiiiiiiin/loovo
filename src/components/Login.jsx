import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth } from "../firebase";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Optional: ensure session is persistent
      await setPersistence(auth, browserLocalPersistence);

      // Firebase login
      await signInWithEmailAndPassword(auth, email, password);

      alert("✅ Login successful!");
      navigate("/");
    } catch (err) {
      console.error("Login error:", err.message);
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setError("Invalid email or password.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert("📩 Password reset email sent. Check your inbox.");
    } catch (err) {
      console.error("Reset error:", err.message);
      setError("Failed to send reset email. Try again.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />

        <button type="submit">Login</button>

        <p className="forgot-password">
          <a href="#" onClick={handleForgotPassword}>Forgot Password?</a>
        </p>

        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}
