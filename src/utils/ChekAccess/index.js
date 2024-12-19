import React, { useEffect, useState } from "react";
import useServerRequest from "../../hooks/useServerRequest";
import { useNavigate } from "react-router-dom";

export function ChekAcess({ onAccessChecked }) {
	const navigate = useNavigate();
	const { makeRequest } = useServerRequest();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const chekAcess = async () => {
			try {
				const resp = await makeRequest(`/chek`, `POST`, null, true);

				if (resp === true) {
					onAccessChecked(true);
				} else {
					navigate(`/log`);
				}
			} catch (error) {
				console.error("Ошибка проверки доступа:", error);
			} finally {
				setLoading(false); // Загрузка завершена
			}
		};
		chekAcess();
	}, []);

	if (loading) {
		return <div>Проверка доступа...</div>; // Индикатор загрузки
	}
}
