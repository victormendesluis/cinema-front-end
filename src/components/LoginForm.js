//Form.js
import React, { useState } from 'react';
import '../style/form.css';

function LoginForm() {
  // State para almacenar los valores del formulario
  const [formData, setFormData] = useState({
    nickname: '',
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
    try {
      const response = await fetch('/users', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      //console.log('LOGIN FORM',data[0]);
      if (response.ok) {
        if(data[0].nickname===formData.nickname){
          // Guarda el token en localStorage
          localStorage.setItem('token', data[0].id);
          localStorage.setItem('logged',true);
          //console.log('Usuario logueado exitosamente:', data[0]);
          // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
        }else{
          console.log("Usuario o contraseña incorrectas");
        }
      } else {
        console.error('Error de autenticación:', data.message);
        // Maneja el error de autenticación, muestra mensajes de error, etc.
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Maneja el error, muestra mensajes de error, etc.
    }
  };

  return (
    <div className="login-container"> {/* Aplicar la clase CSS login-container */}
      <form onSubmit={handleSubmit}>
        <div className="form-group"> {/* Aplicar la clase CSS form-group */}
          <label htmlFor="nickname">Nombre de Usuario</label>
          <input
            className="form-input" // Aplicar la clase CSS form-input
            type="text"
            id="nickname"
            name="nickname"
            value={formData.nickname}
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
        {/*<button className="register-button" type='reset'>Registrarse</button>*/}
      </form>
    </div>
  );
}

export default LoginForm;