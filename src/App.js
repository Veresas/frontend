import logo from './logo.svg';
import {BrowserRouter, Routes, Route, link} from 'react-router-dom';
import './App.css';
import Home from './pages/homePage';
import Account from './pages/accountPage';
import useRouteTracking from './hooks/useRouteTracking';
import RegForm from './pages/RegForm';
import { ApiProvider } from './context/ApiContext';

function App() {

  //useRouteTracking();

  return (
    <ApiProvider baseUrl="http://localhost:8080">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/reg" element={<RegForm />} />
        </Routes>
      </BrowserRouter>
    </ApiProvider>
  );
}

export default App;
