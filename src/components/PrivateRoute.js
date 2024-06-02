import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('logged');
  const admin = localStorage.getItem('admin'); // Suponiendo que el rol del usuario está guardado en localStorage

  if (!isAuthenticated) {
    // Redirigir al usuario a la página de inicio de sesión si no está autenticado
    return <Navigate to="/" />;
  }

  if (!admin) {
    // Redirigir al usuario a una página de no autorizado si no tiene el rol adecuado
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;