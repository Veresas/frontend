import React from "react";
import { Link } from "react-router-dom";
import "./styles.module.css"; // Подключаем стили
import { getSomeCookie } from "../../utils";

export const Header = () => {
	const name = getSomeCookie("Username");

	return (
		<header>
			<nav>
				<ul>
					<li>
						<Link to="/">Каталог</Link>
					</li>
					<li>
						<Link to="/reg">Регистрация</Link>
					</li>
					<li>
						<Link to="/log">Войти</Link>
					</li>
				
					<li>
						<Link to={`/acc/${name}`}>Моя страница</Link>
					</li>
					
				</ul>
			</nav>
		</header>
	);
};
