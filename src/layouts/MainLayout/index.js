import React from "react";
import { Footer, Header } from "../../components";

export const MainLayout = ({ children }) => {
	return (
		<div
			style={{ display: "flex", flexDirection: "column", minHeight: "100dvh" }}
		>
			<Header />
			<div style={{ flex: "1" }}>{children}</div>
			<Footer />
		</div>
	);
};
