import React from 'react';
import { Link } from 'react-router-dom';
import './MapAndTutorial.css';

const MapAndTutorial = () => {
  return (
    <div className="map">
      <div className="map-title">Jak u nas zarezerwować?</div>
      <img className="map-img" src="../assets/roadmap.png" alt="Roadmap" />
    </div>
  );
};

export default MapAndTutorial;
