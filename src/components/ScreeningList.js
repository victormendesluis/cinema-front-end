import React from 'react';

const ScreeningList = ({ screenings, onSelectScreening }) => {
  return (
    <div>
      <h2>Proyecciones</h2>
      <ul>
        {screenings.map(screening => (
          <li key={screening.id} onClick={() => onSelectScreening(screening)}>
            {screening.date} - {screening.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScreeningList;