import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './manageRestaurant.css'; // Ensure this path is correct

import NavBar from '../NavBar/NavBar';

interface RestaurantInfo {
  name: string;
  description: string;
  address: string;
}

interface User {
  userId: number;
  username: string;
  role: string;
}

interface Reservation {
  id: number;
  customerName: string;
  date: string;
  time: string;
}

const ManageRestaurant = () => {
  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfo>({
    name: '',
    description: '',
    address: '',
  });

  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const fetchRestaurantInfo = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
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
          setRestaurantInfo({
            name: response.data.name,
            description: response.data.description,
            address: response.data.address,
          });
        }
      } catch (error) {
        console.error('Error fetching restaurant info:', error);
      }
    };

    fetchRestaurantInfo();
  }, []);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setRestaurantInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
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
  return (
    <>
      <NavBar />
      <div className="manage-restaurant">
        <h1>Manage Your Restaurant</h1>
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
        <h2>Reservations</h2>
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation.id}>
              <div className="reservation-info">
                {reservation.customerName} - {reservation.date} at{' '}
                {reservation.time}
              </div>
              <div className="reservation-actions">
                <button>Cancel</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ManageRestaurant;
