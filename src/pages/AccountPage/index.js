import React, { useEffect, useState } from "react";
import useServerRequest from "../../hooks/useServerRequest";
import { useParams } from "react-router-dom";
import { MovieList, ChekAcess, removeCookie, getSomeCookie } from "../../utils";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "../../layouts";

export const AccountPage = () => {
	const { id } = useParams();
	const [accessGranted, setAccessGranted] = useState(false);
	const { reqData, makeRequest } = useServerRequest();
	const [info, setInfo] = useState(null);
	const navigate = useNavigate();
	const [clik, setClik] = useState(null);
	const [addClik, setAddClik] = useState(null);
	const [filmClick, setFilmClik] = useState(null);
	
	useEffect(() => {
		const takeInfo = async () => {
			await makeRequest(`/acc/${id}`, "GET");
		};

		if (accessGranted === true && !reqData) {
			takeInfo();
		} else if (reqData) {
			setInfo(reqData);
		}

		if (clik) {
			navigate("/log");
		}

	}, [accessGranted, reqData, clik, addClik]);

	if (!accessGranted) {
		return <ChekAcess onAccessChecked={setAccessGranted} />;
	}
	const handleExitClick = () => {
		removeCookie("Username");
		removeCookie("jwtToken");
		setClik(true);
	};

	const handelAddFilmClik = () => {
		navigate("/addFilm/");
	};

	const handelRemakeFilmClik = ({id}) =>{
		navigate("/addFilm/")
	};

	if (info) {
		return (
			<AuthLayout>
				<div>
					<h1>Личная страница</h1>
					<p>Имя: {info.name || "Не указано"}</p>
					<p>Почта: {info.email || "Не указано"}</p>
					<button onClick={handleExitClick}>Выйти из аккаунта</button>
					<div>
						<button onClick={handelAddFilmClik}>Добавить фильм</button>
						<MovieList id={getSomeCookie("Username")} isCatalog={true} />
					</div>

				</div>
			</AuthLayout>
		);
	}
};
