import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ScreeningList from './ScreeningList';
import SeatSelector from './SeatSelector';

const ScreeningPage = () => {
  const { id } = useParams();
  const [screenings, setScreenings] = useState([]);
  const [selectedScreening, setSelectedScreening] = useState(null);
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    fetch(`/movies/${id}/screenings/week`)
      .then(response => response.json())
      .then(data => setScreenings(data))
      .catch(error => console.error('Error fetching screenings:', error));
  }, [id]);

  useEffect(() => {
    if (selectedScreening) {
      fetch(`/screenings/${selectedScreening.id}/seats`)
        .then(response => response.json())
        .then(data => setSeats(data))
        .catch(error => console.error('Error fetching seats:', error));
    }
  }, [selectedScreening]);

  const handleSeatClick = (seatId) => {
    // Enviar solicitud para bloquear la butaca
    fetch(`/seats/${seatId}/block`, { method: 'POST' })
      .then(response => {
        if (response.ok) {
          // Actualizar el estado local para reflejar la butaca bloqueada
          setSeats(seats.map(seat => seat.id === seatId ? { ...seat, blocked: true } : seat));
        } else {
          console.error('Error blocking seat:', response.statusText);
        }
      });
  };

  return (
    <div>
      <ScreeningList screenings={screenings} onSelectScreening={setSelectedScreening} />
      {selectedScreening && (
        <SeatSelector seats={seats} onSeatClick={handleSeatClick} />
      )}
    </div>
  );
};

export default ScreeningPage;