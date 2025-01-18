//import styles from './Login.module.css'

// src/components/Login.jsx
import React, { useState } from 'react';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showAdminInfo, setShowAdminInfo] = useState(false)
  //const [showRegister, setShowRegister] = useState(false);

  // if (showRegister) {
  //   return <Register onSwitchToLogin={() => setShowRegister(false)} />;
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
      
      if (!response.ok) throw new Error('Login failed')
      
      const data = await response.json()
      localStorage.setItem('token', data.access)
      onLoginSuccess()
    } catch (err) {
      setError('Invalid username or password')
    }
  }

  return (
    
      
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Sign in to manage your items</p>
          </div>
  
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="error-message">
                <span>{error}</span>
              </div>
            )}
            
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="form-input"
                placeholder="Enter your username"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
                placeholder="Enter your password"
              />
            </div>
  
            <button
              type="submit"
              className="submit-button"
            >
              Sign in
            </button>
          </form>

          {/* <div className="switchLink">
    <button onClick={() => setShowRegister(true)}>
        Register here
    </button>
</div> */}
        </div>
      </div>
    );
}
export default Login;