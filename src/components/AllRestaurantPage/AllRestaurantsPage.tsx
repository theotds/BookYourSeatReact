import React from 'react';
import { Link } from 'react-router-dom';
import './AllRestaurantsPage.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import NavBar from '../NavBar/NavBar';

interface Restaurant {
  id: number;
  name: string;
  description: string;
  address: string;
}

const AllRestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/restaurants/getAll'
        );
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);
  return (
    <>
      <NavBar />
      <div className="all-restaurants-page">
        <h1>Restaurants Available for Reservation</h1>
        <ul>
          {restaurants.map((restaurant) => (
            <li key={restaurant.id}>
              <h2>{restaurant.name}</h2>
              <p>{restaurant.description}</p>
              <Link to={`/reserve/${restaurant.id}`}>Make a Reservation</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AllRestaurantsPage;
