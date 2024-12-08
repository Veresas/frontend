import React from "react";
import { Link } from "react-router-dom";
import './css/Header.css'; // Подключаем стили
import { getSomeCookie } from "./Coookie";
const Header = () => {
  const username = getSomeCookie('Username');
  if(username === undefined){
    return (
      <header>
        <nav>
          <ul>
            <li><Link to="/">Каталог</Link></li> 
            <li><Link to="/reg">Registration</Link></li>
            <li><Link to="/log">Login</Link></li>
            <li><Link to="/per">Person</Link></li>
            <li><Link to="/addFilm">Add Film</Link></li>
            <li><Link to="/log">Account</Link></li>
          </ul>
        </nav>
      </header>
    );
  }else{
    return (
      <header>
        <nav>
          <ul>
            <li><Link to="/">Каталог</Link></li>
            <li><Link to="/reg">Registration</Link></li>
            <li><Link to="/log">Login</Link></li>
            <li><Link to="/per">Person</Link></li>
            <li><Link to="/addFilm">Add Film</Link></li>
            <li><Link to="/AC">Account</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
  
};

export default Header;
