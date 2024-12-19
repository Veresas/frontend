import { useState } from "react";
import { useApi } from "../context/ApiContext";
import { getJwtFromCookie } from "../utils";

const useServerRequest = () => {
	const { baseUrl } = useApi();
	const [reqData, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const makeRequest = async (path, method, body, chek) => {
		setLoading(true);
		setError(null);
		setData(null);

		try {
			const url = `${baseUrl}${path}`;
			const options = {
				method: method,
				headers: {
					"Content-Type": "application/json", //  Измените, если необходимо
				},
			};
			const jwtToken = getJwtFromCookie("jwtToken");

			if (jwtToken) {
				options.headers.Authorization = `Bearer ${jwtToken}`;
			}

			if (body) {
				options.body = JSON.stringify(body);
			}

			const response = await fetch(url, options);

			if (chek) {
				if (response.ok) {
					return true;
				} else {
					return false;
				}
			}

			if (!response.ok) {
				const errorData = await response
					.json()
					.catch(() => ({ message: "Ошибка сервера" })); // Обработка ошибок ответа
				throw new Error(errorData.message || response.statusText);
			}

			const responseData = await response.json();
			setData(responseData);
			return responseData;
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	};

	return { reqData, error, loading, makeRequest };
};

export default useServerRequest;
