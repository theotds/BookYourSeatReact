import React from 'react';
import logo from '../../assets/product1.png';
import './Product.css';

const Collaboration = () => {
  return (
    <div>
      <div className="product">
        <div className="product-top">
          <img className="product-img" src={logo} />
        </div>
        <div className="product-bottom">
          <div className="product-title">PAKIET GOLD</div>
          <div className="product-detail">
            <ul>
              <li>
                Strona restauracji z pełnym menu, godzinami otwarcia,
                lokalizacją.
              </li>
              <li>
                Opcja dodawania specjalnych ofert, promocji lub kuponów dla
                klientów rezerwujących przez naszą platformę.
              </li>
              <li>
                System rezerwacji online z automatycznym potwierdzaniem i
                przypominaniem klientów.
              </li>
              <li>
                Integracja z systemem płatności online, umożliwiając klientom
                dokonywanie płatności przy rezerwacji.
              </li>
            </ul>
            <button className="button" role="button">
              Sprawdź ofertę
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaboration;
