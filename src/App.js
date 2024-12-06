import logo from './logo.svg';
import {BrowserRouter, Routes, Route, link} from 'react-router-dom';
import './App.css';
import Home from './pages/homePage';
import Account from './pages/accountPage';
import useRouteTracking from './hooks/useRouteTracking';
import RegForm from './pages/regForm';
import LoginForm from './pages/loginPage';
import { ApiProvider } from './context/ApiContext';
import PersonPage from './pages/PersonPage';
import FilmPage from './pages/FilmPage';
import Admin from './pages/adminPage';
function App() {

  //useRouteTracking();

  return (
    <ApiProvider baseUrl="http://localhost:8080">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/reg" element={<RegForm />} />
          <Route path="/log" element={<LoginForm />} />
          <Route path="/Per" element={<PersonPage />} />
          <Route path="/addFilm" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </ApiProvider>
  );
}

export default App;
