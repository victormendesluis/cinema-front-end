import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddScreeningForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cinemaName: '',
    screen: 0,
    movieTitle: '',
    screeningDayAndHourDTO: {
      screeningDay: '',
      screeningStartTime: ''
    },
    audio: '',
    screenPrice: 0,
    id: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'screeningDay' || name === 'screeningStartTime') {
      setFormData({
        ...formData,
        screeningDayAndHourDTO: {
          ...formData.screeningDayAndHourDTO,
          [name]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/screenings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (response.ok) {
        console.log('Screening agregado con éxito!');
        // Limpia el formulario después de enviar los datos
        setFormData({
          cinemaName: '',
          screen: 0,
          movieTitle: '',
          screeningDayAndHourDTO: {
            screeningDay: '',
            screeningStartTime: ''
          },
          audio: '',
          screenPrice: 0,
          id: 0
        });
      } else {
        console.error('Error al agregar screening.');
      }
    })
    .catch(error => console.error('Error al agregar screening:', error));
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div>
      <h2>Agregar Screening</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Nombre del cine:
            <input
              type="text"
              name="cinemaName"
              value={formData.cinemaName}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Sala:
            <input
              type="number"
              name="screen"
              value={formData.screen}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Título de la película:
            <input
              type="text"
              name="movieTitle"
              value={formData.movieTitle}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Día de la proyección:
            <input
              type="text"
              name="screeningDay"
              value={formData.screeningDayAndHourDTO.screeningDay}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Hora de inicio de la proyección:
            <input
              type="text"
              name="screeningStartTime"
              value={formData.screeningDayAndHourDTO.screeningStartTime}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Audio:
            <input
              type="text"
              name="audio"
              value={formData.audio}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Precio de la sala:
            <input
              type="number"
              name="screenPrice"
              value={formData.screenPrice}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Agregar Screening</button>
        <button className="btn btn-primary mb-3" onClick={handleBackClick}>Atrás</button>
      </form>
    </div>
  );
};

export default AddScreeningForm;