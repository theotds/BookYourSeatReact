import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UserDashboard.css'; // Ensure this path is correct

import NavBar from '../NavBar/NavBar';

interface Reservation {
  id: number;
  restaurantName: string;
  date: string;
}

const UserDashboard = () => {
  const [userReservations, setUserReservations] = useState<Reservation[]>([]);
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john@example.com',
  });

  useEffect(() => {
    const reservationsMock: Reservation[] = [
      { id: 1, restaurantName: 'The Italian Corner', date: '2024-06-12' },
      { id: 2, restaurantName: 'Sushi Express', date: '2024-06-18' },
    ];
    setUserReservations(reservationsMock);
  }, []);

  const handleCancelReservation = (reservationId: number) => {
    console.log(`Cancel reservation with ID: ${reservationId}`);
    setUserReservations((current) =>
      current.filter((reservation) => reservation.id !== reservationId)
    );
  };

  return (
    <>
      <NavBar />
      <div className="user-dashboard">
        <h1>User Dashboard</h1>
        <h2>Welcome, {userInfo.name}</h2>
        <p>Email: {userInfo.email}</p>
        <h3>Your Reservations</h3>
        <ul>
          {userReservations.map((reservation) => (
            <li key={reservation.id}>
              <p>
                {reservation.restaurantName} on {reservation.date}
              </p>
              <button onClick={() => handleCancelReservation(reservation.id)}>
                Cancel Reservation
              </button>
            </li>
          ))}
        </ul>
        <Link to="/reservations">Make a New Reservation</Link>
      </div>
    </>
  );
};

export default UserDashboard;
