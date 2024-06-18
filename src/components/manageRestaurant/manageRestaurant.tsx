import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './manageRestaurant.css'; // Ensure this path is correct

import NavBar from '../NavBar/NavBar';

interface Restaurant {
  id: number;
  name: string;
  description: string;
  address: string;
  userId: number;
}

interface User {
  id: number;
  username: string;
  role: string;
}

interface Reservation {
  id: number;
  restaurant: Restaurant;
  user: User;
  reservationDate: string;
  reservationTime: string;
}

const ManageRestaurant = () => {
  const [restaurantInfo, setRestaurantInfo] = useState<Restaurant | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchRestaurantInfo = async () => {
      try {
        if (!user.userId) {
          console.error('User ID not found in local storage.');
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/api/restaurants/${user.userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (response.data) {
          setRestaurantInfo(response.data);
          fetchReservationsByRestaurantName(response.data.name);
        }
      } catch (error) {
        console.error('Error fetching restaurant info:', error);
      }
    };

    const fetchReservationsByRestaurantName = async (name: string) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/reservations/restaurant/${name}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (response.data) {
          setReservations(response.data);
        }
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchRestaurantInfo();
  }, [user.userId]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    if (restaurantInfo) {
      setRestaurantInfo({ ...restaurantInfo, [name]: value });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!user.userId) {
        console.error('User ID not found in local storage.');
        return;
      }

      const response = await axios.post(
        `http://localhost:8080/api/restaurants/update/${user.userId}`,
        restaurantInfo,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        console.log('Restaurant info updated successfully:', response.data);
      } else {
        console.error('Failed to update restaurant info:', response.status);
      }
    } catch (error) {
      console.error('Error updating restaurant info:', error);
    }
  };

  const handleCancelReservation = async (reservationId: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/reservations/${reservationId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        alert('Reservation cancelled successfully.');
        setReservations(reservations.filter((res) => res.id !== reservationId));
      } else {
        console.error('Failed to cancel reservation:', response.status);
      }
    } catch (error) {
      console.error('Error cancelling reservation:', error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="manage-restaurant">
        <h1>Manage Your Restaurant</h1>
        {restaurantInfo && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                type="text"
                name="name"
                value={restaurantInfo.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={restaurantInfo.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                id="address"
                type="text"
                name="address"
                value={restaurantInfo.address}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit">Update Info</button>
          </form>
        )}
        <h2>Reservations</h2>
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation.id}>
              <div className="reservation-info">
                {reservation.user.username} - {reservation.reservationDate} at{' '}
                {reservation.reservationTime}
              </div>
              <div className="reservation-actions">
                <button onClick={() => handleCancelReservation(reservation.id)}>
                  Cancel
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ManageRestaurant;
