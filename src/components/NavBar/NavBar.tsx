import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/GetYourSeat.png';
import './NavBar.css';

interface NavBarProps {
  isLoggedIn: boolean;
}

const NavBar = ({ isLoggedIn }: NavBarProps) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <nav className="nav-bar">
      <Link to="/home">
        <img className="logo" src={logo} alt="Logo" />
      </Link>
      <ul>
        <li>
          <button className="options">Restauracje</button>
        </li>
        <li className="separator"></li>
        <li>
          <button className="options">Moje rezerwacje</button>
        </li>
        <li className="separator"></li>
        <li>
          <button className="options">Pomoc</button>
        </li>
        <li className="separator"></li>
        <li>
          <button className="options">Współpraca</button>
        </li>
        <li className="separator"></li>
        <li>
          {isLoggedIn ? (
            <button
              onClick={() => {
                /* navigate to my account */
              }}
              className="options"
            >
              Moje konto
            </button>
          ) : (
            <button
              onClick={() => {
                /* navigate to login */
              }}
              className="options"
            >
              Zaloguj się
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
