import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { ApiProvider } from "./context/ApiContext";

import {
	AccountPage,
	AdminPage,
	FilmPage,
	HomePage,
	RegisterPage,
} from "./pages";

import LoginForm from "./pages/LoginPage";
import { MainLayout } from "./layouts";

function App() {
	return (
		<div>
			<ApiProvider baseUrl="http://localhost:8080">
				<BrowserRouter>
					<MainLayout>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/reg" element={<RegisterPage />} />
							<Route path="/log" element={<LoginForm/>} />
							<Route path="/addFilm" element={<AdminPage />} />
							<Route path="/FilmPage/:id" element={<FilmPage />} />
							<Route path="/acc/:id" element={<AccountPage />} />
						</Routes>
					</MainLayout>
				</BrowserRouter>
			</ApiProvider>
		</div>
	);
}

export default App;
