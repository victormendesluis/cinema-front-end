import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../style/form.css';
import RegisterModal from './RegisterModal';

function RegisterForm() {
  // State para almacenar los valores del formulario
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    surname: '',
    email: '',
    phone:'',
    nickname:'',
    password: '',
    confirmPassword:'',
    points: 100,
    premium: false,
    admin: false,
    token: 'dummyToken4',
    recover_code: 'dummyRecoverCode4'
  });
  const [showModal, setShowModal]=useState(false);

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
    //console.log(formData);
    try {
      if(formData.password===formData.confirmPassword){
        const response = await fetch('/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        //console.log(data);
        setShowModal(true);
        Navigate('/');
      }else{
        alert('Las contraseñas no coinciden.')
      }
      // Aquí puedes manejar la respuesta de la API, mostrar mensajes de éxito, etc.
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      // Aquí puedes manejar el error, mostrar mensajes de error, etc.
    }
  };

  return (
    <div className="login-container">
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
      </form>
      <RegisterModal show={showModal} onClose={()=>setShowModal(false)}></RegisterModal>
    </div>
  );
}

export default RegisterForm;