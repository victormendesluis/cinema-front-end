import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/form.css';

function UserEditForm() {
    const navigate = useNavigate();
    // State para almacenar los valores del formulario
    const [formData, setFormData] = useState({
      name: '',
      surname: '',
      email: '',
      phone:'',
      nickname:'',
      password: '',
      confirmPassword:''
    });
  
    // Función para manejar cambios en los campos del formulario
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        console.log(data);
        // Aquí puedes manejar la respuesta de la API, mostrar mensajes de éxito, etc.
      } catch (error) {
        console.error('Error al registrar usuario:', error);
        // Aquí puedes manejar el error, mostrar mensajes de error, etc.
      }
    };
  
    const handleBackClick = () => {
      navigate('/users');
    };
  
    return (
      <div className="login-container">
        <h2>Registro</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Apellido:</label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Número de teléfono:</label>
            <input
              type="numeric"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="nickname">Nombre de usuario</label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirme su contraseña:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Registrarse</button>
          <button onClick={handleBackClick}>Volver</button>
        </form>
      </div>
    );
  }

  export default UserEditForm;