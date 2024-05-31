import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UserCard({user}) {
  const navigate = useNavigate();

  const handleFilmsClick = () =>{
    navigate('/movies')
  }

  const handleUsersClick = () =>{
    navigate('/users')
  }

  return (
    <div className="user-card">
      <div>
        <p>Ahora puedes realizar las siguientes acciones:</p>
        <ul>
          <li><button onClick={handleFilmsClick}>Películas</button></li>
          <li><button onClick={handleUsersClick}>Usuarios</button></li>
        </ul>
      </div>
    </div>
  );
}

export default UserCard;