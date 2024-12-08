import React from "react";
import { Link } from "react-router-dom";
import './css/Header.css'; // Подключаем стили

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/AC">Account</Link></li>
          <li><Link to="/reg">Registration</Link></li>
          <li><Link to="/log">Login</Link></li>
          <li><Link to="/per">Person</Link></li>
          <li><Link to="/FA">Add Film</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
