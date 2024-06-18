import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    confirmPassword: '', // Only used in registration
  });
  const [mode, setMode] = useState('login'); // Can be 'login' or 'register'
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (mode === 'login') {
        const response = await axios.post('http://localhost:8080/auth/login', {
          username: credentials.username,
          password: credentials.password,
        });

        if (response.data.token) {
          // Assuming the token is sent under the key 'token'
          localStorage.setItem('token', response.data.token); // Store the token

          // Optionally save user data if needed elsewhere in the app
          localStorage.setItem(
            'user',
            JSON.stringify({
              role: response.data.role,
              userId: response.data.userId,
              username: credentials.username,
            })
          );
          // Assuming the response contains the role and other user details
          if (response.data.role === 'ADMIN') {
            navigate('/dashboard/admin');
          } else if (response.data.role === 'USER') {
            navigate('/dashboard/user');
          } else if (response.data.role === 'RESTAURANT') {
            navigate('/dashboard/ManageRestaurant');
          }
        }
      } else {
        if (credentials.password !== credentials.confirmPassword) {
          setError("Passwords don't match");
          return;
        }

        const response = await axios.post(
          'http://localhost:8080/auth/register',
          {
            username: credentials.username,
            password: credentials.password,
          }
        );

        if (response) {
          setMode('login');
          navigate('/login');
        }
      }
    } catch (error) {
      setError('Error during login/registration. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="toggle-buttons">
          <button
            className="toggle-button"
            onClick={() => setMode('login')}
            disabled={mode === 'login'}
          >
            Login
          </button>
          <button
            className="toggle-button"
            onClick={() => setMode('register')}
            disabled={mode === 'register'}
          >
            Register
          </button>
        </div>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        {mode === 'register' && (
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={credentials.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <button type="submit">{mode === 'login' ? 'Login' : 'Register'}</button>
      </form>
    </div>
  );
};

export default LoginPage;
