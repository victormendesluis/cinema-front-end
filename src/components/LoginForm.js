//Form.js
import React, { useState } from 'react';
import '../style/form.css';

function LoginForm() {
  // State para almacenar los valores del formulario
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    /*try {
      const response = await fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.token) {
        // Guarda el token en localStorage
        localStorage.setItem('token', data.token);
        console.log('Usuario logueado exitosamente:', data);
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
      } else {
        console.error('Error de autenticación:', data.message);
        // Maneja el error de autenticación, muestra mensajes de error, etc.
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Maneja el error, muestra mensajes de error, etc.
    }
    */
  };

  return (
    <div className="login-container"> {/* Aplicar la clase CSS login-container */}
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group"> {/* Aplicar la clase CSS form-group */}
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            className="form-input" // Aplicar la clase CSS form-input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group"> {/* Aplicar la clase CSS form-group */}
          <label htmlFor="password">Contraseña:</label>
          <input
            className="form-input" // Aplicar la clase CSS form-input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button className="login-button" type="submit">Iniciar Sesión</button>
        <button className="register-button" type='reset'>Registrarse</button>
      </form>
    </div>
  );
}

export default LoginForm;