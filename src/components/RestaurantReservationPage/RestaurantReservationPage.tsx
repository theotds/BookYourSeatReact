import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RestaurantReservationPage.css';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';

interface User {
  userId: number;
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

const RestaurantReservationPage = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    console.log(id);
    const fetchRestaurant = async () => {
      console.log(`http://localhost:8080/api/restaurants/restaurant/${id}`);
      try {
        const response = await axios.get<Restaurant>(
          `http://localhost:8080/api/restaurants/restaurant/${id}`
        );
        console.log(response.data);
        setRestaurant(response.data);
      } catch (error) {
        console.error('Failed to fetch restaurant', error);
      }
    };
    const fetchUser = () => {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      setUser(storedUser);
    };
    fetchUser();
    fetchRestaurant();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user.userId;

      if (!userId) {
        throw new Error('User not logged in');
      }

      const reservationTime = `${time}:00`;
      const response = await axios.post(
        'http://localhost:8080/api/reservations/create',
        {
          reservationDate: date,
          reservationHour: reservationTime,
          userId: user?.userId,
          restaurantId: id,
        }
      );
      console.log(date, reservationTime, user?.userId, id);

      if (response.status === 201) {
        alert('Reservation successful!');
        navigate('/'); // Navigate to the home page or another page
      } else {
        throw new Error('Failed to create reservation.');
      }
    } catch (error) {
      alert('Error making reservation. Please try again.');
      console.error('Error making reservation:', error);
    }
  };

  return (
    <div className="restaurant-reservation-page">
      {restaurant ? (
        <>
          <h1>Make a Reservation at {restaurant?.name}</h1>
          <p>{restaurant.description}</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="date">Choose a date:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="time">Choose a time:</label>
              <input
                type="time"
                id="time"
                name="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
            <button type="submit">Reserve</button>
          </form>
        </>
      ) : (
        <p>Loading restaurant information...</p>
      )}
    </div>
  );
};

export default RestaurantReservationPage;
