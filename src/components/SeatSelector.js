import React from 'react';

const SeatSelector = ({ seats, onSeatClick }) => {
  return (
    <div>
      <h2>Selecciona tus butacas</h2>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(10, 1fr)` }}>
        {seats.map(seat => (
          <div
            key={seat.id}
            style={{
              border: '1px solid black',
              padding: '10px',
              margin: '5px',
              backgroundColor: seat.blocked ? 'red' : 'white',
              cursor: 'pointer'
            }}
            onClick={() => !seat.blocked && onSeatClick(seat.id)}
          >
            {seat.number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatSelector;