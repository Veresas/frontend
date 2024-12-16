import React from "react";
import { Link } from "react-router-dom";
import './css/Header.css'; // Подключаем стили

const Header = () => {

    return (
      <header>
        <nav>
          <ul>
            <li><Link to="/">Каталог</Link></li> 
            <li><Link to="/reg">Регистрация</Link></li>
            <li><Link to="/log">Войти</Link></li>
            <li><Link to="/aclair">Моя страница</Link></li>
          </ul>
        </nav>
      </header>
    );
  
};

export default Header;
