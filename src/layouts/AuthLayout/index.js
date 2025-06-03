import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSomeCookie } from "../../utils";

export const AuthLayout = ({ children }) => {
	const navigate = useNavigate();

	const id = getSomeCookie("UserId");

	useEffect(() => {
		if (id === undefined) {
			navigate("/log");
		} else {
			navigate(`/acc`);
		}
	}, [id]);

	return <>{children}</>;
};
