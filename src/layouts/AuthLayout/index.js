import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSomeCookie } from "../../utils";

export const AuthLayout = ({ children }) => {
	const navigate = useNavigate();

	const name = getSomeCookie("Username");

	useEffect(() => {
		if (name === undefined) {
			navigate("/log");
		} else {
			navigate(`/acc/${name}`);
		}
	}, [name]);

	return <>{children}</>;
};
