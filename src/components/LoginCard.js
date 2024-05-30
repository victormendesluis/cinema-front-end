import React, { useState } from 'react';

function LoginCard() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Llamada a la API
    const response = await fetch('https://tu-api.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Guarda el token en el almacenamiento local
      localStorage.setItem('token', data.token);
      // Redirige a una página protegida
      window.location.href = '/dashboard';
    } else {
      alert('Nombre de usuario o contraseña incorrectos');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>Nombre de usuario:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}

export default LoginCard;