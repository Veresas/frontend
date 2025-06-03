import React, { useState, useEffect} from "react";
import useFetchFile from "../../hooks/useFetchFile";
import { getSomeCookie } from "../Cookie";
import useServerRequest from "../../hooks/useServerRequest";
import { useNavigate } from "react-router-dom";
import "./MovieCard.css";
import { ModalWindow } from "../../components/ModalWindow";
import { CopyLinkBox } from "../../utils"
import { useApi } from "../../context/ApiContext";

export const MovieCard = ({ movie, isControls }) => {
	const { data, fetchData } = useFetchFile();
	const [file, setFile] = useState(null);
	const navigate = useNavigate();
	const { reqData, makeRequest } = useServerRequest();
	const [isModalWriteOffOpen, setModalWriteOffOpen] = useState(false);
	const [isPublicRoom, setIsPublicRoom] = useState(true); // По умолчанию публичная
	const [roomId, setRoomId] = useState(null)
	const [makeReq, setMakeReq] = useState(false)
	const { baseUrl } = useApi();

	const ModalWriteOffOpen = () => setModalWriteOffOpen(true);
	const ModalWriteOffClose = () => {
		setModalWriteOffOpen(false);
		if (roomId) {
			navigate(`/FilmPage?roomId=${roomId}`);
		}
	}


	const handelAcceptCreateClik = (e) => {
	  e.preventDefault();
	  var userid = getSomeCookie("UserId")
	  if (userid){
		console.log("Зашли");
		setMakeReq(true)
	  } else {
		navigate("/log")
	  }
	};
	const handleClick = () => {
		ModalWriteOffOpen()

	};

	useEffect(() => {
		const fetchData = async () => {
		  if (makeReq) {
			console.log("Попытка сделать запрос")
			try {
			  const response = await makeRequest(
				"/films/createRoom", 
				"POST", 
				{ "movieId": movie.id, "isPublic": isPublicRoom }
			  );
			  setRoomId(response.room_id)
			console.log("Попытка сделать запрос")
			} catch (error) {
			  console.error("Ошибка при создании комнаты:", error);
			} finally {
			  setMakeReq(false);
			}
		  }
		};
	  
		fetchData();
	  }, [makeReq]);
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
				const url = `/films/p/${movie.id}.jpg`;
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
			<div className="movie-list">
				<div className="movie-card" onClick={handleClick}>
					<img src={file.url} alt={movie.title} />
					<h3>{movie.title}</h3>
					{isControls && (
						<div>
							<button onClick={handelRemakeClik}>ред</button>
							<button onClick={handelDeletClik}>удалить</button>
						</div>
					)}
				</div>

				<ModalWindow isOpen={isModalWriteOffOpen} onClose={ModalWriteOffClose}>
					{!reqData && 
					<form onSubmit={handelAcceptCreateClik}>
						<label className="block text-lg font-medium text-gray-700 mb-4">
						Какую комнату создать?
						</label>

						<div className="toggle-container">
						<div
							className="toggle-slider"
							style={{ transform: isPublicRoom === "private" ? "translateX(100%)" : "translateX(0%)" }}
						/>
						<label className="toggle-option">
							<input
							type="radio"
							name="isPublicRoom"
							value="public"
							checked={isPublicRoom === "public"}
							onChange={(e) => setIsPublicRoom(e.target.value)}
							/>
							<span>Публичная</span>
						</label>
						<label className="toggle-option">
							<input
							type="radio"
							name="isPublicRoom"
							value="private"
							checked={isPublicRoom === "private"}
							onChange={(e) => setIsPublicRoom(e.target.value)}
							/>
							<span>Приватная</span>
						</label>
						</div>

						<button
						type="submit"
						>
						Создать
						</button>
					</form>}

					{reqData && <div>
						<span>Скопируйте ссылку приглашение</span>
						<CopyLinkBox link={`${baseUrl}/filmPage?roomid=${roomId}`}/>
						
					</div>}
				</ModalWindow>
			</div>


			
		);
	} else {
		return <p>No poster available</p>;
	}
};
