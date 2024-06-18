import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1>404 Not Found</h1>
      <p>
        The page you are looking for doesn't exist or another error occurred.
      </p>
      <p>Go back, or head over to the homepage to choose a new direction.</p>
      <Link to="/" className="not-found-link">
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
