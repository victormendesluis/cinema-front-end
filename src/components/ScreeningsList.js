import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ScreeningsList = () => {
  const [screenings, setScreenings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simular fetch a la API para obtener los screenings
    // Reemplaza esto con tu llamada real a la API
    const fetchScreenings = async () => {
      try {
        const response = await fetch('/screenings');
        if (response.ok) {
          const data = await response.json();
          setScreenings(data);
        } else {
          console.error('Error al obtener los screenings.');
        }
      } catch (error) {
        console.error('Error al obtener los screenings:', error);
      }
    };

    fetchScreenings();
  }, []);

  const handleAddClick = () => {
    navigate('/screenings/add');
  };

  return (
    <div>
      <h2>Lista de Screenings</h2>
      <table>
        <thead>
          <tr>
            <th>Cine</th>
            <th>Sala</th>
            <th>Título de la película</th>
            <th>Día de la proyección</th>
            <th>Hora de inicio de la proyección</th>
            <th>Audio</th>
            <th>Precio de la sala</th>
          </tr>
        </thead>
        <tbody>
          {screenings.map(screening => (
            <tr key={screening.id}>
              <td>{screening.cinemaName}</td>
              <td>{screening.screen}</td>
              <td>{screening.movieTitle}</td>
              <td>{screening.screeningDayAndHourDTO.screeningDay}</td>
              <td>{screening.screeningDayAndHourDTO.screeningStartTime}</td>
              <td>{screening.audio}</td>
              <td>{screening.screenPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddClick}>Añadir Screening</button>
    </div>
  );
};

export default ScreeningsList;