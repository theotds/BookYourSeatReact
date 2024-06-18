import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RestaurantReservationPage.css'; // Ensure this path is correct
import NavBar from '../NavBar/NavBar';

interface Restaurant {
  id: number;
  name: string;
  description: string;
}

const RestaurantReservationPage = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!restaurantId) {
      console.log('No restaurant ID provided, handling error...');
      navigate('/error', { replace: true });
      return;
    }

    const id = parseInt(restaurantId);

    const fetchedRestaurant: Restaurant = {
      id: id,
      name: 'The Italian Corner',
      description: 'Enjoy classic Italian dishes with a modern twist.',
    };

    setRestaurant(fetchedRestaurant);
  }, [restaurantId, navigate]);

  const handleReservation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!reservationDate || !reservationTime) {
      alert('Please select a date and time for your reservation.');
      return;
    }
    alert(
      `Reservation made for ${restaurant?.name} on ${reservationDate} at ${reservationTime}`
    );
    navigate('/');
  };

  if (!restaurant) return <div>Loading...</div>;

  return (
    <>
      <NavBar />
      <div className="restaurant-reservation-page">
        <h1>Make a Reservation at {restaurant.name}</h1>
        <p>{restaurant.description}</p>
        <form onSubmit={handleReservation}>
          <label>
            Choose a date:
            <input
              type="date"
              value={reservationDate}
              onChange={(e) => setReservationDate(e.target.value)}
            />
          </label>
          <label>
            Choose a time:
            <input
              type="time"
              value={reservationTime}
              onChange={(e) => setReservationTime(e.target.value)}
            />
          </label>
          <button type="submit">Reserve</button>
        </form>
      </div>
    </>
  );
};

export default RestaurantReservationPage;
