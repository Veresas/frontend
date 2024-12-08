import React from "react";
import { Link } from "react-router-dom";
import './css/Header.css'; // Подключаем стили

const Header = () => {

    return (
      <header>
        <nav>
          <ul>
            <li><Link to="/">Каталог</Link></li> 
            <li><Link to="/reg">Registration</Link></li>
            <li><Link to="/log">Login</Link></li>
            <li><Link to="/addFilm">Add Film</Link></li>
            <li><Link to="/aclair">Account</Link></li>
          </ul>
        </nav>
      </header>
    );
  
};

export default Header;
