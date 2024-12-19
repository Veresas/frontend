import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useApi } from "../../context/ApiContext";
import axios from "axios";
import { getSomeCookie, getJwtFromCookie } from "../Cookie";
import "./UploadForm.module.css";

export const UploadForm = () => {


	const { register, handleSubmit } = useForm();

	const { baseUrl } = useApi();
	const [photoFile, setPhotoFile] = useState(null);
	const [videoFile, setVideoFile] = useState(null);

	const [notification, setNotification] = useState({
		message: '',
		type: '', // 'success', 'error', 'warning', 'info'
		show: false,
	  });

	const showNotification = (message, type) => {
		setNotification({ message, type, show: true });
	};

	const renderNotification = () => {
		if (!notification.show) return null;
	
		let className = 'notification';
		switch (notification.type) {
		  case 'success':
			className += ' success';
			break;
		  case 'error':
			className += ' error';
			break;
		  case 'warning':
			className += ' warning';
			break;
		  case 'info':
			className += ' info';
			break;
		  default:
			break;
		}
	
		return (
		  <div className={className}>
			{notification.message}
		  </div>
		);
	  };

	const onSubmit = (data) => {
		if (photoFile) {
			var file = photoFile,
				parts = file.name.split(".");
			var type = parts.pop();
		}
		const id = getSomeCookie("Username");

		const formData = new FormData();
		formData.append("title", data.title);
		if (photoFile) formData.append("photo", photoFile);
		if (videoFile) formData.append("video", videoFile);
		formData.append("id", id);

		const jwtToken = getJwtFromCookie("jwtToken");

		axios
			.post(`${baseUrl}/films/upload`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${jwtToken}`,
				},
			})
			.then((response) => {
				alert("Успешная загрузка");
			})
			.catch((error) => {
				alert("Ошибка загрузки, проверте данные и попробуйте позже");
			});
	};

	return (
		<al>
			{renderNotification()}
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="title">Название:</label>
				<input type="text" id="title" {...register("title")} />

				<label htmlFor="poster">Постер:</label>
				<input
					{...register("photo")}
					type="file"
					accept="image/*"
					onChange={(e) => setPhotoFile(e.target.files[0])}
				/>

					<div>
							<label htmlFor="video">Фильм:</label>
							<input
								{...register("video")}
								type="file"
								required="true"
								accept="video/*"
								onChange={(e) => setVideoFile(e.target.files[0])}
							/>
					</div>

				<button type="submit">Загрузить</button>
			</form>
		</al>
	);
};
