import React from 'react';
import NavBar from '../NavBar/NavBar';
import Collaboration from '../Collaboration/Collaboration';
import MapAndTutorial from '../MapAndTutorial/MapAndTutorial';
import './HomePage.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // Placeholder for authentication state

  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} />
      <Collaboration />
      <MapAndTutorial />
    </div>
  );
};

export default App;
