import React, { useState, useEffect } from 'react';
import useFetchFile from '../hooks/useFetchFile';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const { data, loading, error, fetchData, cancelFetch } = useFetchFile();
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pages/FilmPage/${movie.filme}`); // Переход на страницу /movie/имя_фильма
  };

  useEffect(() => { 
    const fetchMovies = async () => {
      try{
        const url = `/films/p/${movie.poster}`;
        await fetchData(url);
        setFile(data);
      
      }catch(ex){

      }

    };

    fetchMovies();
  }, [movie]);
  if (file && file.url) {
    return (
      <div className="movie-card" onClick={handleClick}>
        <img src={file.url} alt={movie.title} />
        <h3>{movie.title}</h3>
      </div>
    );
  } else {
    return <p>No poster available</p>;
  }
};

export default MovieCard;