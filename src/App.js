import React, { useState } from 'react';
import logo from './logo.svg';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import MovieForm from './components/MovieForm';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import UserCard from './components/UserCard'; // Importa el componente de la tarjeta de usuario
import TopBar from './components/Topbar';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const [showUserCard, setShowUserCard] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const toggleUserCard = () => {
    setShowUserCard(!showUserCard);
  };

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  const toggleRegisterForm = () => {
    setShowRegisterForm(!showRegisterForm);
  };

  return (
    <div className="App">
      <TopBar />
      {/* Botón con icono para mostrar/ocultar la tarjeta de usuario */}
      <button onClick={toggleUserCard}>
        <FontAwesomeIcon icon={faUser} /> {/* Icono de usuario */}
      </button>
      {/* Renderiza la tarjeta de usuario si showUserCard es verdadero */}
      {showUserCard && <UserCard username="Usuario" />}

      {/* Botón para mostrar/ocultar el formulario de inicio de sesión */}
      <button onClick={toggleLoginForm}>
        {showLoginForm ? 'Ocultar Formulario de Inicio de Sesión' : 'Mostrar Formulario de Inicio de Sesión'}
      </button>
      {/* Renderiza el formulario de inicio de sesión si showLoginForm es verdadero */}
      {showLoginForm && <LoginForm />}

      {/* Botón para mostrar/ocultar el formulario de inicio de sesión */}
      <button onClick={toggleRegisterForm}>
        {showRegisterForm ? 'Ocultar Formulario de Registro' : 'Mostrar Formulario de Registro'}
      </button>
      {/* Renderiza el formulario de inicio de sesión si showLoginForm es verdadero */}
      {showRegisterForm && <RegisterForm />}
      <Router>
        <Routes>
          {/* Ruta para la página de detalles de la película */}
          <Route path="/movies/:id" element={<MovieDetails/>} />
          {/* Ruta para la página principal */}
          <Route path="/" element={<MovieList />} />
        </Routes>
      </Router>

      {/* 
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <MovieForm/>
      */}
    </div>
  );
}

export default App;
