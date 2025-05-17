import React, { useState } from 'react';
import { auth, createUserWithEmailAndPassword } from '../firebase'; // Make sure Firebase is properly initialized
import { useNavigate } from 'react-router-dom'; // For redirection
import './Register.css'; // Import your CSS
import { updateProfile } from "firebase/auth";
import { db } from "../firebase"; // ✅ Needed for setDoc
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [username, setUsername] = useState(''); // Added username state

  const navigate = useNavigate(); // Hook for navigation



  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // ✅ Save the result into a variable
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // ✅ Update the display name in Firebase Auth
      await updateProfile(userCredential.user, {
        displayName: username,
      });

      // ✅ Save user info in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        username: username,
        email: email,
      });

      alert("User signed up successfully!");
      navigate("/");

    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already in use. Please try logging in.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };


  return (
    <div className="register-container">
      <form onSubmit={handleSignUp} className="register-form">
        <h2>Sign Up</h2>

        <div className="form-group">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit">Sign Up</button>

        {error && <p className="error-message">{error}</p>} {/* Display error message */}
      </form>
    </div>
  );
};

export default SignUp;
