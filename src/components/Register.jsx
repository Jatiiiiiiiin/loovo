import React, { useState } from 'react';
import { auth, createUserWithEmailAndPassword } from '../firebase'; // Make sure Firebase is properly initialized
import { useNavigate } from 'react-router-dom'; // For redirection
import './Register.css'; // Import your CSS

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); // Hook for navigation

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Create user with email and password
      await createUserWithEmailAndPassword(auth, email, password);
      alert('User signed up successfully!'); // Show success alert
      navigate('/'); // Redirect to the main page (App.jsx)
    } catch (err) {
      // Customize error messages
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already in use. Please try logging in.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSignUp} className="register-form">
        <h2>Sign Up</h2>

        <div className="form-group">
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
