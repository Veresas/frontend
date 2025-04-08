import React, { useEffect, useState} from "react";
import { Video } from "../../utils";
import { useParams, useSearchParams  } from "react-router-dom";

export const FilmPage = () => {
	const [socket, setSocket] = useState(null);
	const [searchParams] = useSearchParams();
  	const roomId = searchParams.get('roomId');
	const [videoId, setVideoId] = useState(null);

	useEffect(() => {

		const newSocket = new WebSocket(`ws://localhost:8080/ws?roomId=123`);
		setSocket(newSocket);
	
		// Обработка входящих сообщений
		newSocket.onmessage = (event) => {
		  const data = event.data;
		  console.log("Получили сообщение", data)
		  if (data.type === "movieId") {
			setVideoId(data.value)
			console.log("Фильм id: ", data.type)
		  }

		};
		
		newSocket.onopen = ( event ) => {
			console.log("Открыли вебсокет");
			const getFilmMassage = {
				action: "join",
				timestamp: new Date().toISOString()
			}
			socket.send(JSON.stringify(getFilmMassage))
		}

		newSocket.onclose = (event) => {
			console.log("Закрыли вебсокет");
		  };
		return () => {
			if (newSocket.readyState === WebSocket.OPEN) {
				// Отправляем сообщение перед закрытием
				const goodbyeMessage = {
					action: "leave",
					timestamp: new Date().toISOString()
				};
				newSocket.send(JSON.stringify(goodbyeMessage));
				console.log("Отправлено сообщение перед закрытием:", goodbyeMessage);
			}
			// Закрываем соединение
			newSocket.close();
			console.log("Соединение закрыто при размонтировании");
		};
	  }, []);

	return (
		<div>
			{videoId && <Video id={videoId} />}
		</div>
	);
};
