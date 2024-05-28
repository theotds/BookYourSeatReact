import React from 'react';
import Product from '../Product/Product';
import './Collaboration.css';

const Collaboration = () => {
  return (
    <section className="collab" id="collabID">
      <h1 className="collabTitle">Szukasz współpracy z nami?</h1>
      <p className="collabDescription">
        Poniżej są podane nasze oferty, które możemy zaoferować do współpracy z
        nami, w razie kontaktu zapraszamy na sekcje poniżej{' '}
        <a href="#" className="link">
          "Dane kontaktowe"
        </a>
      </p>
      <div className="products-content">
        <Product />
        <Product />
        <Product />
      </div>
    </section>
  );
};

export default Collaboration;
