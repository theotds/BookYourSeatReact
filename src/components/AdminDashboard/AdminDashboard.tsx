import React, { useState, useEffect } from 'react';
import './AdminDashboard.css'; // Ensure this path is correct and the CSS file is properly loaded
import NavBar from '../NavBar/NavBar';
import axios from 'axios';

interface User {
  id: number;
  username: string;
  role: string;
}

interface Restaurant {
  id: number;
  name: string;
  description: string;
  address: string;
  userId: number;
}

interface Reservation {
  id: number;
  user: User;
  restaurant: Restaurant;
  reservationDate: string;
  reservationTime: string;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    fetchUsers();
    fetchReservations();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>(
        'http://localhost:8080/api/users'
      );
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  const fetchReservations = async () => {
    try {
      const response = await axios.get<Reservation[]>(
        'http://localhost:8080/api/reservations/all'
      );
      setReservations(response.data);
    } catch (error) {
      console.error('Failed to fetch reservations', error);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/user/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };

  const handleDeleteReservation = async (reservationId: number) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/reservations/${reservationId}`
      );
      setReservations(
        reservations.filter((reservation) => reservation.id !== reservationId)
      );
    } catch (error) {
      console.error('Failed to delete reservation', error);
    }
  };

  const handleSetRole = async (userId: number, role: string) => {
    try {
      await axios.post(
        `http://localhost:8080/api/users/${userId}/changeRole/${role}`
      );
      fetchUsers();
    } catch (error) {
      console.error('Failed to set user role', error);
    }
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
                {user.username} ({user.role})
                <button onClick={() => handleDeleteUser(user.id)}>
                  Delete User
                </button>
                <button onClick={() => handleSetRole(user.id, 'USER')}>
                  Set as User
                </button>
                <button onClick={() => handleSetRole(user.id, 'RESTAURANT')}>
                  Set as Restaurant
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
                {reservation.user.username} - {reservation.restaurant.name} on{' '}
                {reservation.reservationDate}
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
