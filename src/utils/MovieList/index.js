import React, { useState, useEffect } from "react";
import useServerRequest from "../../hooks/useServerRequest";
import "./MovieList.css";
import { MovieCard } from "../MovieCard";

export const MovieList = ({ id, isCatalog }) => {
	const [movies, setMovies] = useState([]);

	const { error, loading, makeRequest } = useServerRequest();

	useEffect(() => {
		const fetchMovies = async () => {
			const rep = await makeRequest(`/films/filmList/${id}`, "GET");
			const data = rep;
			setMovies(data);
		};

		fetchMovies();
	}, []);
	if (loading) {
		return <div>Загрузка...</div>;
	}
	if (error) {
		return <div>Ошибка: {error.message}</div>;
	}
	if (!movies) {
		return <div>Нет данных</div>; // Отображать при отсутствии данных
	}
	return (
		<div className="movie-list">
			{movies.map((movie) => (
				<MovieCard key={movie.id} movie={movie} isControls={isCatalog} /> //  id - уникальный идентификатор фильма
			))}
		</div>
	);
};