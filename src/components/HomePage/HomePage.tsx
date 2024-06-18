import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
import './HomePage.css';

import product1 from '../../assets/product1.png';
import product2 from '../../assets/product2.png';
import product3 from '../../assets/product3.png';

interface User {
  userId: number;
  username: string;
  role: string;
}

interface Plan {
  id: number;
  name: string;
  description: string;
  image: string; // Adding an image URL field
}

const HomePage = () => {
  const [searchInput, setSearchInput] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userJSON = localStorage.getItem('user');
    if (userJSON) {
      setUser(JSON.parse(userJSON));
    }
  }, []);

  const restaurantPlans: Plan[] = [
    {
      id: 1,
      name: 'Basic',
      description: 'Essential features for small restaurants',
      image: product1,
    },
    {
      id: 2,
      name: 'Standard',
      description: 'Advanced features for growing businesses',
      image: product2,
    },
    {
      id: 3,
      name: 'Premium',
      description: 'All-inclusive plan for large enterprises',
      image: product3,
    },
  ];

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8080/api/restaurants/name/${searchInput}`
      );
      if (response.data) {
        const restaurant = response.data;
        navigate(`/reserve/${restaurant.id}`);
      } else {
        alert('Restaurant not found');
      }
    } catch (error) {
      console.error('Failed to fetch restaurant', error);
      alert('Failed to fetch restaurant. Please try again.');
    }
  };

  const registerRestaurantPlan = async (plan: Plan) => {
    if (
      window.confirm(
        `Are you sure you want to register for the ${plan.name} plan?`
      )
    ) {
      try {
        const response = await axios.post(
          `http://localhost:8080/api/users/${user?.userId}/changeRole/RESTAURANT`
        );

        if (response.status === 200) {
          if (user) {
            alert(`You have registered for the ${plan.name} plan.`);
            const updatedUser = { ...user, role: 'RESTAURANT' }; // Assuming user is not null

            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);

            navigate('/dashboard/ManageRestaurant');
          } else {
            console.error('User data is not available');
          }
        } else {
          throw new Error('Failed to update user role.');
        }
      } catch (error) {
        alert('Failed to register plan.');
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className="home">
        <h1>Welcome to the Table Reservation System</h1>
        <p>Your one-stop solution for managing table bookings effortlessly.</p>
        <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for reservations..."
          />
          <button type="submit">Search</button>
        </form>
        {user?.role !== 'RESTAURANT' && (
          <div className="restaurant-plans">
            {restaurantPlans.map((plan) => (
              <div
                key={plan.id}
                className="plan"
                onClick={() => registerRestaurantPlan(plan)}
              >
                <img src={plan.image} alt={`${plan.name} Plan`} />
                <h3>{plan.name}</h3>
                <p>{plan.description}</p>
              </div>
            ))}
          </div>
        )}
        {user && user?.role === 'RESTAURANT' && (
          <div>
            <h2>Manage Your Restaurant</h2>
            <Link to="/Dashboard/ManageRestaurant">Go to Management Page</Link>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
