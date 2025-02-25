import React, { useState, useEffect, useRef } from "react";
import useFetchFile from "../../hooks/useFetchFile";
//import useFetchVideo from "../../hooks/useFetchVideo";
import "./Video.css";

export const Video = ({ id }) => {
	const { data, loading, fetchData } = useFetchFile(true);
	const [mediaSourceReady, setMediaSourceReady] = useState(false);
	const [startChunk, setStartChunk] = useState(0);
	const [endChunk, setEndChunk] = useState(0);
	const videoRef = useRef(null); 

	if (id === `t`) {
		id = `6235397-hd_1080_1920_25fps`;
	}

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				setEndChunk(startChunk + 10024);
				const url = `/films/v/${id}.mp4`;
				await fetchData(url, startChunk, endChunk);
				setStartChunk(endChunk + 1);
				setMediaSourceReady(true);
			} catch (ex) {
				console.error("Error fetching video:", ex);
			}
		};

		fetchMovies();
	}, [id, fetchData, startChunk]);

	useEffect(() => {
		if (data?.url && videoRef.current) {
			videoRef.current.src = data.url;
		  }
	}, [data]);

	if (mediaSourceReady && data?.url) {
		return (
			<div className="video-container">
				<div className="video-player">
					<video 
						controls
						className="video-element"
						ref={videoRef}
						onError={(e) => console.error('Video error:', e.target.error)}>
						
						Ваш браузер не поддерживает воспроизведение видео.
					</video>
				</div>
			</div>
		);
	} else {
		return (
			<div className="loading-container">
				<p className="loading-text">Загрузка...</p>
			</div>
		);
	}
};
