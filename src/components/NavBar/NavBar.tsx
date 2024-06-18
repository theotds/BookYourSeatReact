// NavBar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();
  const userJSON = localStorage.getItem('user');
  const user = userJSON ? JSON.parse(userJSON) : null;

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/AllRestaurantPage">Restaurants</Link>
      {user ? (
        <>
          {user.role === 'ADMIN' && (
            <Link to="/dashboard/admin">Admin Dashboard</Link>
          )}
          {user.role === 'USER' && (
            <Link to="/dashboard/user">User Dashboard</Link>
          )}
          {user.role === 'RESTAURANT' && (
            <Link to="/dashboard/ManageRestaurant">Manage Restaurant</Link> // Link to the management page for restaurant owners
          )}
          <button
            onClick={() => {
              localStorage.removeItem('user');
              window.location.reload(); // Simple way to force reload/redirect
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={() => {
            navigate('/login');
          }}
        >
          Login
        </button>
      )}
    </nav>
  );
};

export default NavBar;
