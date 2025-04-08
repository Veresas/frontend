import React, { useEffect, useRef, useState} from "react";
import { Video } from "../../utils";
import { useSearchParams  } from "react-router-dom";
import { getSomeCookie} from "../../utils"
export const FilmPage = () => {
	const [socket, setSocket] = useState(null);
	const [searchParams] = useSearchParams();
  	const roomId = searchParams.get('roomId');
	const [videoId, setVideoId] = useState(null);
	const userId = getSomeCookie("UserId");
	const [notRepitSeek, setNotRepitSeek] = useState(false);

	const videoRef = useRef();

	useEffect(() => {

		const newSocket = new WebSocket(`ws://localhost:8080/ws?roomId=${roomId}&userId=${userId}`);
		setSocket(newSocket);
	
		newSocket.onmessage = (event) => {
			try {
				const data = JSON.parse(event.data);
				if (data.type === "movieId") {
				  setVideoId(data.value);
				}
		
				if (data.type === "pause") {
					videoRef.current?.pause();
					videoRef.current.currentTime = data.value;
				}
				
				if (data.type === "play") {					
					const now = Date.now();
					const delay = Math.max(0, data.options.startAt - now);

					setTimeout(() => {
						videoRef.current.currentTime = data.value;
						videoRef.current?.play();
					  }, delay);

					videoRef.current?.play();
				}
				
				if (data.type === "seek") {
					videoRef.current.currentTime = data.value;
					setNotRepitSeek(true)
				}

			  } catch (e) {
				console.warn("Неформатированное сообщение:", event.data);
			  }
		};
		
		newSocket.onopen = ( event ) => {
			const getFilmMassage = {
				action: "join",
				timestamp: new Date().toISOString()
			}
			newSocket.send(JSON.stringify(getFilmMassage))
		}

		newSocket.onclose = (event) => {
		  };
		return () => {
		};
	  }, []);

	useEffect(() => {
		const video = videoRef.current;
		console.log("VIDEO:", video);
		if (!video || !socket) return;

		const onPlay = () => {
			console.log("PLAY detected");
			socket.send(JSON.stringify({ action: "play", startAt: Date.now() + 500 }));
		};

		const onPause = () => {
			socket.send(JSON.stringify({ action: "pause", time: video.currentTime }));
		};

		let seekTimeout = null;
		const onSeek = () => {
			if (notRepitSeek){
				setNotRepitSeek(false);
				return
			}

			if (seekTimeout) {
				clearTimeout(seekTimeout);
			}
			

			seekTimeout = setTimeout(() => {
				socket.send(JSON.stringify({
				  action: "seek",
				  time: video.currentTime
				}));
				seekTimeout = null;
			}, 3000);
		};

		video.addEventListener("play", onPlay);
		video.addEventListener("pause", onPause);
		video.addEventListener("seeked", onSeek);

		return () => {
			video.removeEventListener("play", onPlay);
			video.removeEventListener("pause", onPause);
			video.removeEventListener("seeked", onSeek);
		};
		}, [socket, videoId]);

	return (
		<div>
			{videoId && <Video id={videoId} ref={videoRef} />}
		</div>
	);
};
