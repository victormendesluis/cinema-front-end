import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserCard() {
  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone:'',
    nickname:'',
    password: ''
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`/users/${localStorage.getItem('token')}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.log(error)
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(formData.password===formData.confirmPassword){
        const response = await fetch(`/users/${localStorage.getItem('token')}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        console.log(data);
        alert('Usuario modificado correctamente');
        setIsEditable(false);
      }else{
        alert('Las contraseñas no coinciden.')
      }
      // Aquí puedes manejar la respuesta de la API, mostrar mensajes de éxito, etc.
    } catch (error) {
      console.error('Error al modificar el usuario:', error);
      // Aquí puedes manejar el error, mostrar mensajes de error, etc.
    }
  };

  const handleEdit=()=>{
    setIsEditable(true);
  }

  const handleBack=()=>{
    navigate('/');
  }

  return (
    <div className="user-card">
      <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={!isEditable}
          />
        </div>
        <div className="form-group">
          <label htmlFor="surname">Apellido:</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
            disabled={!isEditable}
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
            disabled
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
            disabled={!isEditable}
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
            disabled
          />
        </div>
        <div className='container'>
          <button onClick={handleEdit} type='button'>Editar perfil</button>
          {isEditable && (
              <button type="submit">Guardar cambios</button>
            )}
          <button type='button' onClick={handleBack}>Atrás</button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default UserCard;