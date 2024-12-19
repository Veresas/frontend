import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useServerRequest from "../../hooks/useServerRequest";
import { setJwtInCookie, setUsernameCookie, getSomeCookie} from "../../utils"
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { error, loading, makeRequest } = useServerRequest();
	const navigate = useNavigate();
	const [er, setEr] = useState(null);

	const onSubmit = async (data) => {
		try {
			setEr(false);
			const response = await makeRequest("/A/login", "POST", data);
			await setJwtInCookie(response.token);
			await setUsernameCookie(response.username);
			const id = getSomeCookie("Username");

			
			navigate(`/acc/${id}`);
		} catch (err) {

			setEr(true);
		}
	};

	if (loading) {
		return <div>Загрузка...</div>;
	}
	if (error) {

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

			{er && (
					<span>Неврный логин или пароль</span>
				)}
			<button type="submit">Войти</button>
		</form>
	);
};
