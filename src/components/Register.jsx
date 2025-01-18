import { useState } from 'react';
import { useItems } from './ItemContext';
import styles from './styles/Register.module.css';

function Register({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminCode: ''  // Special code for superuser registration
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          admin_code: formData.adminCode,
          is_superuser: true
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Registration failed');
      }

      setSuccess('Registration successful! You can now login.');
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        adminCode: ''
      });

      // Automatically switch to login after 2 seconds
      setTimeout(() => {
        onSwitchToLogin();
      }, 2000);

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        <div className={styles.registerHeader}>
          <h2>Register Super User</h2>
          <p>Create an admin account to manage the system</p>
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}
        {success && <div className={styles.successMessage}>{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className={styles.formInput}
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className={styles.formInput}
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className={styles.formInput}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className={styles.formInput}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="adminCode">Admin Code</label>
            <input
              id="adminCode"
              name="adminCode"
              type="password"
              required
              className={styles.formInput}
              value={formData.adminCode}
              onChange={handleChange}
              placeholder="Enter admin registration code"
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Register
          </button>
        </form>

        <div className={styles.switchLink}>
          <button onClick={onSwitchToLogin}>
            Already have an account? Login here
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
