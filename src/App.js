import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './pages/homePage';
import RegForm from './pages/regForm';
import LoginForm from './pages/loginPage';
import { ApiProvider } from './context/ApiContext';
import Admin from './pages/adminPage';
import FilmPage from './pages/filmPage';
import Header from './modules/Header';
import Footer from './modules/Footer';
import Account from './pages/accountPage';

function App() {

  
  return (
    <div>
    <ApiProvider baseUrl="http://localhost:8080">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reg" element={<RegForm />} />
          <Route path="/log" element={<LoginForm />} />
          <Route path="/addFilm" element={<Admin />} />
          <Route path="/FilmPage/:id" element={<FilmPage />} />
          <Route path="/acc/:id" element={<Account />} />
        </Routes>
      <Footer />
      </BrowserRouter>
    </ApiProvider>

    </div>
  );
}

export default App;
