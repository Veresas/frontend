import React, { useState, useEffect} from "react";
import useFetchFile from "../../hooks/useFetchFile";
import { getSomeCookie } from "../Cookie";
import useServerRequest from "../../hooks/useServerRequest";
import { useNavigate } from "react-router-dom";
import "./MovieCard.css";
import { Alert } from "bootstrap";
import { ModalWindow } from "../../components/ModalWindow";

export const MovieCard = ({ movie, isControls }) => {
	const { data, fetchData } = useFetchFile();
	const [file, setFile] = useState(null);
	const navigate = useNavigate();
	const { reqData, makeRequest } = useServerRequest();
	const [delet, setDelet] = useState(null);
	const [isModalWriteOffOpen, setModalWriteOffOpen] = useState(false);

	const ModalWriteOffOpen = () => setModalWriteOffOpen(true);//TODO: Закончить
	const ModalWriteOffClose = () => setModalWriteOffOpen(false);

	const handleClick = () => {
		navigate(`/FilmPage/${movie.poster}`);
	};

	const handelRemakeClik = (event) => {
		event.stopPropagation();
		navigate(`/addFilm/${movie.id}`)
	};

	const handelDeletClik = async (event) =>{
		event.stopPropagation();
		await makeRequest(`/A/FilmDelet/676452bd53bf8948d929748e`, "DELETE", {userid:"6764517353bf8948d929748d"});
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
			<div>
				<div className="movie-card" onClick={handleClick}>
					<img src={file.url} alt={movie.title} />
					<h3>{movie.title}</h3>
					{isControls && (
						<d>
							<button onClick={handelRemakeClik}>ред</button>
							<button onClick={handelDeletClik}>удалить</button>
						</d>
					)}
				</div>

				<ModalWindow isOpen={isModalWriteOffOpen} onClose={ModalWriteOffClose}>
					<form>
						<label style={{ display: 'block' }}>Опишите причину списания</label>
						
						<button type="submit" onClick={handelAcceptDeletClik}>Подтвердить списание</button>
					</form>
				</ModalWindow>
			</div>


			
		);
	} else {
		return <p>No poster available</p>;
	}
};
