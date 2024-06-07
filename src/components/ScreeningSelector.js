import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SeatSelection from './SeatSelector';

const DropdownFunciones = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [screenings, setScreenings] = useState([]);
  const [selectedScreening, setSelectedScreening] = useState('');
  const [screen, setScreen] = useState([]);

  useEffect(() => {
    const fetchFunciones = async () => {
      try {
        const response = await fetch(`/screenings/week/available`); // /movie/${id}/screenings/week
        if (response.ok) {
            const data=await response.json();
            setScreenings(data);
        }
      } catch (error) {
        console.error('Error fetching screenings:', error);
      }
    };

    fetchFunciones();
  }, [id]);

  const handleSelectChange = async (event) => {
    const id = event.target.value;
    setSelectedScreening(id);

    if (id) {
      try {
        const response = await fetch(`/screening/${id}/seats`);
        if(response.ok){
            const data=await response.json();
            setScreen(data);
        }
      } catch (error) {
        console.error('Error fetching seats:', error);
      }
    }
  };

  const handleBackClick = () => {
    navigate(`/movies/${id}`);
  };

  return (
    <div>
      <label htmlFor="screenings">Seleccione una función:</label>
      <select id="screenings" value={selectedScreening} onChange={handleSelectChange}>
        <option value="" disabled>Seleccione una función</option>
        {screenings.map((screening) => (
          <option key={screening.id} value={screening.id}>
            {screening.start_time}
          </option>
        ))}
      </select>

      {selectedScreening && screen.length > 0 && (
        <SeatSelection seats={screen} screeningId={selectedScreening} />
      )}
      <button className="btn btn-primary" onClick={handleBackClick}>Atrás</button>
    </div>
  );
};

export default DropdownFunciones;