import React, { useEffect, useRef, useState} from "react";
import { Video } from "../../utils";
import { useSearchParams  } from "react-router-dom";
import { getSomeCookie} from "../../utils"
import { useNavigate } from "react-router-dom";
import 'react-chat-elements/dist/main.css';
import { MessageBox } from 'react-chat-elements';
import "./FilmPage.css";
import useServerRequest from "../../hooks/useServerRequest";

export const FilmPage = () => {
	const [socket, setSocket] = useState(null);
	const [searchParams] = useSearchParams();
  	const roomId = searchParams.get('roomId');
	const navigate = useNavigate();
	const [videoId, setVideoId] = useState(null);
	const userId = getSomeCookie("UserId");
	const [notRepitSeek, setNotRepitSeek] = useState(false);
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState('');
	const videoRef = useRef();
	const originalUrl = `/FilmPage?roomId=${roomId}`
	const { error, makeRequest } = useServerRequest();
	const [userName, setUserName] = useState('');

	useEffect(() => {
		const fetchUserName = async () => {
			try {
				const rep = await makeRequest(`/name`, "GET")
				setUserName(rep.userName)
				console.log(userName)
			} catch{
				console.error(error)
			}
		};

		if (!userId) {
			localStorage.setItem('returnUrl', originalUrl);
			navigate("/log");
		}

		fetchUserName()

	}, [userId, navigate]);

	useEffect(() => {
		if (!userId) return;


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

				if (data.type === "mes") {
					let reqMessage ={
						userName: data.options.userName,
						mesText: data.value
					}
					setMessages(prev => [...prev, reqMessage]);
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
	
	const sendMessage = () => {
			if (!input.trim()) return;
			let userMessage ={
				userName: userName,
				mesText: input
			}
			setMessages(prev => [...prev, userMessage]);
			setInput('')
			socket.send(JSON.stringify({ action: "mes", content: userMessage}));
	}

	useEffect(() => {
		if (!socket || !videoId) return;
		
		const video = videoRef.current;
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
		<div className="video-chat-container">
			{videoId && <Video id={videoId} ref={videoRef} />}

			<div className="chat-wrapper">
				<div className="chat-messages">
					{messages.map((msg, i) => (
						<MessageBox
						key={i}
						id={String(i)}
						position={'right'}
						type="text"
						text={msg.mesText}
						date={new Date()}
						title={msg.userName}
						focus={false}
						titleColor="#000"
						forwarded={false}
						replyButton={false}
						removeButton={false}
						status="received"
						notch={true}
						retracted={false}
						/>
					))}
				</div>

				<div className="chat-input-block">
					<input
						className="chat-input"
						value={input}
						onChange={e => setInput(e.target.value)}
						placeholder="Введите сообщение..."
					/>
					<button className="chat-send-button" onClick={sendMessage}>
						Отправить
					</button>
				</div>
			</div>
		</div>
	);
};
