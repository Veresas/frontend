import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useServerRequest from "../../hooks/useServerRequest";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
		trigger,
		watch,
		setValue,
	} = useForm();
	const { makeRequest } = useServerRequest();
	const [go, setGo] = useState(null);
	const [nameError, setNameError] = useState(null);
	useEffect(() => {
		if (go) {
			navigate("/log");
		}
	}, [go]);

	const validateName = (value) => {
		if (!/^[a-zA-Z]+$/.test(value)) {
			return "Имя должно содержать только латинские буквы.";
		}
		if (value.length < 3) {
			return "Имя должно содержать минимум 3 символа";
		}
		return true;
	};

	const validatePassword = (value) => {
		if (
			value.length < 6 ||
			!/[a-z]/.test(value) ||
			!/[A-Z]/.test(value) ||
			!/\d/.test(value) ||
			!/[^a-zA-Z\d\s]/.test(value)
		) {
			return "Пароль должен содержать минимум 6 символов, хотя бы одну строчную и заглавную латинские буквы, хотя бы одну цифру и специальный символ.";
		}
		return true;
	};

	const validateEmail = (value) => {
		if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
			return "Почта должна соответствовать формату example@email.com.";
		}
		return true;
	};

	const checkNameUniqueness = async (name) => {
		if (name) {
			try {
				const response = await makeRequest("/A/check-name", "POST", { name });
				if (response && response.isUnique === false) {
					setNameError("Это имя уже занято.");
					return false;
				} else if (response && response.isUnique === true) {
					setNameError(null);
					return true;
				} else {
					setNameError("Неизвестный ответ от сервера");
					return "Неизвестный ответ от сервера";
				}
			} catch (error) {
				console.error("Ошибка проверки имени", error);
				setNameError("Ошибка проверки имени.");
				return "Ошибка проверки имени."; // Вернём ошибку для react-hook-form
			}
		}
		return true;
	};

	const onSubmit = async (data) => {
		makeRequest("/A/reg", "POST", data);
		setGo(true);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<label htmlFor="name">Имя:</label>
				<input
					type="text"
					id="name"
					{...register("name", {
						required: "Имя обязательно для заполнения.",
						validate: validateName,
					})}
					onBlur={async () => {
						await trigger("name"); // Сначало валидация
						await checkNameUniqueness(watch("name")); // Проверка уникальности
					}}
				/>
				{errors.name && <span style={{ color: "red" }}>{errors.name.message}</span>}
				{nameError && <span style={{ color: "red" }}>{nameError}</span>}
			</div>

			<div>
				<label htmlFor="email">Почта:</label>
				<input
					type="email"
					id="email"
					{...register("email", {
						required: "Почта обязательна для заполнения.",
						validate: validateEmail,
					})}
					onBlur={() => trigger("email")}
				/>
				{errors.email && (
					<span style={{ color: "red" }}>{errors.email.message}</span>
				)}
			</div>

			<div>
				<label htmlFor="password">Пароль:</label>
				<input
					type="password"
					id="password"
					{...register("password", {
						required: "Пароль обязателен для заполнения.",
						validate: validatePassword,
					})}
					onBlur={() => trigger("password")}
				/>
				{errors.password && (
					<span style={{ color: "red" }}>{errors.password.message}</span>
				)}
			</div>
			<button type="submit">Зарегистрироваться</button>
		</form>
	);
};
