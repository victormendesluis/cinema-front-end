import React, { useState } from 'react';

function UserCard({username}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Aquí podrías realizar la lógica de inicio de sesión
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="user-card">
      {!isLoggedIn ? (
        // Formulario de inicio de sesión si el usuario no ha iniciado sesión
        <div>
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleLogin}>
            <label htmlFor="username">Usuario:</label>
            <input type="text" id="username" />
            <label htmlFor="password">Contraseña:</label>
            <input type="password" id="password" />
            <button type="submit">Iniciar Sesión</button>
          </form>
        </div>
      ) : (
        // Contenido después de iniciar sesión
        <div>
          <h2>Bienvenido, {username}!</h2>
          <p>Ahora puedes realizar las siguientes acciones:</p>
          <ul>
            <li>Opción 1</li>
            <li>Opción 2</li>
            <li>Opción 3</li>
          </ul>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      )}
    </div>
  );
}

export default UserCard;