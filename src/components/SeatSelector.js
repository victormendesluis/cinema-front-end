import React, { useState } from 'react';
import '../style/seatselector.css';
import { useNavigate } from 'react-router-dom';

function SeatSelection({ seats, screeningId }) {
  const [seatState, setSeatState] = useState(seats);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [userIdentifier, setUser] = useState([]);
  const navigate=useNavigate();

  const handleSeatClick = (seat) => {
    if (seat.available) {
      setSelectedSeats((prevSelectedSeats) =>
        prevSelectedSeats.includes(seat.id)
          ? prevSelectedSeats.filter((id) => id !== seat.id)
          : [...prevSelectedSeats, seat.id]
      );

      setSeatState((prevSeats) =>
        prevSeats.map((s) =>
          s.id === seat.id ? { ...s, available: !s.available } : s
        )
      );
    }
  };

  const getUserIdentifier = async () =>{
    try{
      const response = await fetch(`/users/${localStorage.getItem('token')}`);
      if (response.ok) {
        const data = await response.json();
        setUser(data.email);
      } 
    }catch(error){
      console.error('Error al recuperar al usuario:', error);
    }
  }

  const renderSeats = () => {
    const rows = {};
    getUserIdentifier();
    seatState.forEach((seat) => {
      if (!rows[seat.row_number]) {
        rows[seat.row_number] = [];
      }
      rows[seat.row_number].push(seat);
    });

    return Object.keys(rows).map((rowNumber) => (
      <div key={rowNumber} className="seat-row">
        {rows[rowNumber].map((seat) => (
          <div
            key={seat.id}
            className={`seat ${seat.available ? 'available' : 'unavailable'} ${
              selectedSeats.includes(seat.id) ? 'selected' : ''
            }`}
            onClick={() => handleSeatClick(seat)}>
          </div>
        ))}
      </div>
    ));
  };

  const handleReserveClick = async () => {
    try {
      const response = await fetch(`/screenings/ticket/buyNoSecurity`, { // Reemplaza con tu endpoint de API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          seats: selectedSeats,
          screening_id: parseInt(screeningId),
          userIdentifier: userIdentifier
        }),
      });
      console.log(response);
      if (response.ok) {
        alert('Asientos reservados con éxito!');
        navigate('/');
      } else {
        alert('Error al reservar asientos.');
      }
    } catch (error) {
      console.error('Error al reservar asientos:', error);
    }
  };

  return (
    <div className="seat-selection">
      <h2>Eliga sus asientos</h2>
      <div className="seat-grid">{renderSeats()}</div>
      <button onClick={handleReserveClick}>Reservar</button>
    </div>
  );
}

export default SeatSelection;