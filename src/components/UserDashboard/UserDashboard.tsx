import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './UserDashboard.css';
import NavBar from '../NavBar/NavBar';

export interface User {
  userId: number;
  username: string;
  role: string;
}

interface Reservation {
  id: number;
  restaurant: {
    id: number;
    name: string;
    description: string;
    address: string;
    userId: number;
  };
  reservationDate: string;
  reservationTime: string;
}

const UserDashboard = () => {
  const [userReservations, setUserReservations] = useState<Reservation[]>([]);
  const [userInfo, setUserInfo] = useState<User>({
    userId: 0,
    username: '',
    role: '',
  });

  useEffect(() => {
    const fetchReservations = async () => {
      const user = JSON.parse(localStorage.getItem('user') || '{}') as User;
      const userId = user.userId;

      if (!userId) {
        console.error('User not logged in');
        return;
      }

      try {
        const response = await axios.get<Reservation[]>(
          `http://localhost:8080/api/reservations/user/${userId}`
        );
        console.log(response.data);
        setUserReservations(response.data);
      } catch (error) {
        console.error('Failed to fetch reservations', error);
      }
    };

    const fetchUserInfo = async () => {
      const user = JSON.parse(localStorage.getItem('user') || '{}') as User;
      if (user) {
        setUserInfo(user);
      }
    };

    fetchReservations();
    fetchUserInfo();
  }, []);

  const handleCancelReservation = async (reservationId: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/reservations/${reservationId}`
      );
      if (response.status === 200) {
        setUserReservations((current) =>
          current.filter((reservation) => reservation.id !== reservationId)
        );
      } else {
        console.error('Failed to cancel reservation');
      }
    } catch (error) {
      console.error('Error cancelling reservation:', error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="user-dashboard">
        <h1>User Dashboard</h1>
        <h2>Welcome, {userInfo.username}</h2>
        <h3>Your Reservations</h3>
        <ul>
          {userReservations &&
            userReservations.map((reservation) => (
              <li key={reservation.id}>
                <p>
                  {reservation.reservationTime} {reservation.reservationDate} at{' '}
                  {reservation.restaurant.name}
                </p>
                <button onClick={() => handleCancelReservation(reservation.id)}>
                  Cancel Reservation
                </button>
              </li>
            ))}
          {!userReservations && <p>no reservations</p>}
        </ul>
        <Link to="/AllRestaurantPage">Make a New Reservation</Link>
      </div>
    </>
  );
};

export default UserDashboard;
