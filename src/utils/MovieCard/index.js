import React, { useState, useEffect} from "react";
import useFetchFile from "../../hooks/useFetchFile";
import { useNavigate } from "react-router-dom";
import "./MovieCard.css";

export const MovieCard = ({ movie, isControls }) => {
	const { data, fetchData } = useFetchFile();
	const [file, setFile] = useState(null);
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/FilmPage/${movie.poster}`);
	};

	const handelRemakeClik = (event) => {
		event.stopPropagation();
		navigate(`/addFilm/${movie.id}`)
	};
	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const url = `/films/p/${movie.poster}.jpg`;
				await fetchData(url);

			} catch (ex) {}
		};

		if(data){
			setFile(data);
		}else{
			fetchMovies();
        }
	}, [data]);

	if (file && file.url) {
		return (
			<div className="movie-card" onClick={handleClick}>
				<img src={file.url} alt={movie.title} />
				<h3>{movie.title}</h3>
				{isControls && (
					<d>
						<button onClick={handelRemakeClik}>ред</button>
						<button>удалить</button>
					</d>
				)}
			</div>
		);
	} else {
		return <p>No poster available</p>;
	}
};
