import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const ScreeningsList = () => {
  const [screenings, setScreenings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simular fetch a la API para obtener todas las funciones
    // Reemplaza esto con tu llamada real a la API
    const fetchAllScreenings = async () => {
      try {
        const response = await fetch('/screenings');
        if (response.ok) {
          const data = await response.json();
          setScreenings(data);
        } else {
          console.error('Error al obtener las funciones.');
        }
      } catch (error) {
        console.error('Error al obtener las funciones:', error);
      }
    };

    fetchAllScreenings();
  }, []);

  const handleBackClick = () => {
    navigate(`/`);
  };

  const handleAddClick = () => {
    navigate(`/screenings/add`);
  };

  const handleEditClick = (id) => {
    navigate(`/screenings/${id}`);
  };

  return (
    <div>
      <h2>Todas las Funciones</h2>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Cine</th>
            <th>Sala</th>
            <th>Título de la película</th>
            <th>Día de la proyección</th>
            <th>Hora de inicio de la proyección</th>
            <th>Audio</th>
            <th>Precio de la sala</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {screenings.map(screening => (
            <tr key={screening.id}>
              <td>{screening.screen.cinema.name}</td>
              <td>{screening.screen.id}</td>
              <td>{screening.movie.title}</td>
              <td>{screening.dayFromStartTime}</td>
              <td>{screening.timeFromStarTime}</td>
              <td>{screening.audio}</td>
              <td>{screening.price}</td>
              <td><button className="btn btn-primary mr-2" onClick={()=>handleEditClick(screening.id)}>Editar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button className="btn btn-primary mb-3" onClick={handleAddClick}>Añadir Sesión</button>
        <button className="btn btn-secondary mb-3" onClick={handleBackClick}>Atrás</button>
      </div>
    </div>
  );
};

export default ScreeningsList;