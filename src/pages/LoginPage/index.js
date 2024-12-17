import React from "react";
import { useForm } from "react-hook-form";
import useServerRequest from "../../hooks/useServerRequest";
import { setJwtInCookie, setUsernameCookie } from "../../utils/Coookie";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { error, loading, makeRequest } = useServerRequest();
	const navigate = useNavigate();

	const onSubmit = async (data) => {
		try {
			const response = await makeRequest("/A/login", "POST", data);

			await setJwtInCookie(response.token);
			await setUsernameCookie(response.username);

			navigate("/account");
		} catch (err) {
			console.error("Ошибка регистрации:", err);
			alert(`Ошибка регистрации: ${err.message}`);
		}
	};

	if (loading) {
		return <div>Загрузка...</div>;
	}
	if (error) {
		return <div>Ошибка: {error.message}</div>;
	}

	return (
		<form style={{ marginTop: "20px" }} onSubmit={handleSubmit(onSubmit)}>
			<div>
				<label htmlFor="name">Имя:</label>
				<input
					type="text"
					id="name"
					{...register("name", { required: true, minLength: 3 })}
				/>
				{errors.name && (
					<span>Имя обязательно и должно содержать минимум 3 символа.</span>
				)}
			</div>

			<div>
				<label htmlFor="password">Пароль:</label>
				<input
					type="password"
					id="password"
					{...register("password", { required: true, minLength: 6 })}
				/>
				{errors.password && (
					<span>Пароль обязательно и должен содержать минимум 6 символов.</span>
				)}
			</div>
			<button type="submit">Войти</button>
		</form>
	);
};
