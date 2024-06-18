import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import LoginPage from '../LoginPage/LoginPage';
import HomePage from '../HomePage/HomePage';
import UserDashboard from '../UserDashboard/UserDashboard';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import AllRestaurantsPage from '../AllRestaurantPage/AllRestaurantsPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import ProtectedRoute from '../ProtectWrapper/ProtectedRoute';
import ManageRestaurant from '../manageRestaurant/manageRestaurant';
import RestaurantReservationPage from '../RestaurantReservationPage/RestaurantReservationPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard/user"
        element={
          <ProtectedRoute role="USER">
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/ManageRestaurant"
        element={
          <ProtectedRoute role="RESTAURANT">
            <ManageRestaurant />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reserve/:restaurantId"
        element={
          <ProtectedRoute role="user">
            <RestaurantReservationPage />
          </ProtectedRoute>
        }
      />
      <Route path="/AllRestaurantPage" element={<AllRestaurantsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
