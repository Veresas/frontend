import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import useServerRequest from '../hooks/useServerRequest';
import './css/MovieList.css';

const MovieList = ({id}) => {
  const [movies, setMovies] = useState([]);

  const { error, loading, makeRequest } = useServerRequest();

  useEffect(() => {
    const fetchMovies = async () => {
      
        const rep = await makeRequest(`/films/filmList/${id}`, "GET") 
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
        <MovieCard key={movie.id} movie={movie} /> //  id - уникальный идентификатор фильма
      ))}
    </div>
  );
};

export default MovieList;
