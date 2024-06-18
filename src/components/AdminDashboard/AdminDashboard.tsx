import React, { useState, useEffect } from 'react';
import './AdminDashboard.css'; // Ensure this path is correct and the CSS file is properly loaded

import NavBar from '../NavBar/NavBar';

const AdminDashboard = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
  ]);
  const [reservations, setReservations] = useState([
    {
      id: 1,
      userName: 'Alice',
      restaurantName: 'The Italian Corner',
      date: '2024-06-12',
    },
    {
      id: 2,
      userName: 'Bob',
      restaurantName: 'Sushi Express',
      date: '2024-06-18',
    },
  ]);

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleDeleteReservation = (reservationId: number) => {
    setReservations(
      reservations.filter((reservation) => reservation.id !== reservationId)
    );
  };

  return (
    <>
      <NavBar />
      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>
        <section>
          <h2>Users</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.name} ({user.email})
                <button onClick={() => handleDeleteUser(user.id)}>
                  Delete User
                </button>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Reservations</h2>
          <ul>
            {reservations.map((reservation) => (
              <li key={reservation.id}>
                {reservation.userName} - {reservation.restaurantName} on{' '}
                {reservation.date}
                <button onClick={() => handleDeleteReservation(reservation.id)}>
                  Cancel Reservation
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
};

export default AdminDashboard;
