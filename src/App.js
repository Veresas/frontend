import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { ApiProvider } from "./context/ApiContext";

import {
	AccountPage,
	AdminPage,
	FilmPage,
	HomePage,
	RegisterPage,
	LoginPage,
} from "./pages";
import { MainLayout } from "./layouts";
function App() {
	sessionStorage.setItem('tryes', 3);
	return (
		<div>
			<ApiProvider baseUrl="http://localhost:8080">
				<BrowserRouter>
					<MainLayout>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/reg" element={<RegisterPage />} />
							<Route path="/log" element={<LoginPage />} />
							<Route path="/addFilm" element={<AdminPage />} />
							<Route path="/filmPage" element={<FilmPage />} />
							<Route path="/acc" element={<AccountPage />} />
						</Routes>
					</MainLayout>
				</BrowserRouter>
			</ApiProvider>
		</div>
	);
}

export default App;
