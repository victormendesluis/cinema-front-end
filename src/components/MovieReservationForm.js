import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const MovieReservationForm = () => {
  const [formData, setFormData] = useState({
    cinemaName: '',
    screen: '',
    movieTitle: '',
    screeningDayAndHourDTO: {
      screeningDay: '',
      screeningStartTime: ''
    },
    audio: '',
    screenPrice: '8.25'
  });

  const [cinemas, setCinemas] = useState([]);
  const [screens, setScreens] = useState([]);
  const [days, setDays] = useState([]);
  const [times, setTimes] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Simular fetch a API para obtener cines, salas, días y horas
    setCinemas(['CineMontes', 'Cinepolis', 'CineStar']);
    setScreens([1, 2, 3, 4, 5]);
    setDays(['2024-06-01', '2024-06-02', '2024-06-03']);
    setTimes(['18:00', '20:30', '22:00']);
    
    // Establecer el título de la película desde el estado de navegación
    if (location.state?.movieTitle) {
      setFormData(prevFormData => ({
        ...prevFormData,
        movieTitle: location.state.movieTitle
      }));
    }
  }, [location.state]);

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
    console.log('Form Data Submitted: ', formData);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      navigate('/');
    }, 5000);
  };

  const handleBackToDetails = () => {
    navigate(-1);  // Navigate back to the previous page
  };

  return (
    <div>
      {showAlert && <div className="alert">Reserva realizada con éxito!</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Nombre del cine:
            <select
              name="cinemaName"
              value={formData.cinemaName}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un cine</option>
              {cinemas.map(cinema => (
                <option key={cinema} value={cinema}>{cinema}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Sala:
            <select
              name="screen"
              value={formData.screen}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una sala</option>
              {screens.map(screen => (
                <option key={screen} value={screen}>{screen}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Título de la película:
            <input
              type="text"
              name="movieTitle"
              value={formData.movieTitle}
              readOnly
              required
            />
          </label>
        </div>
        <div>
          <label>
            Día de la proyección:
            <select
              name="screeningDay"
              value={formData.screeningDayAndHourDTO.screeningDay}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un día</option>
              {days.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Hora de inicio de la proyección:
            <select
              name="screeningStartTime"
              value={formData.screeningDayAndHourDTO.screeningStartTime}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una hora</option>
              {times.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Audio:
            <select
              name="audio"
              value={formData.audio}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione el tipo de audio</option>
              <option value="Doblada">Doblada</option>
              <option value="Original">Original</option>
              <option value="Subtitulada">Subtitulada</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Precio de la sala:
            <input
              type="number"
              name="screenPrice"
              value={formData.screenPrice}
              readOnly
              required
            />
          </label>
        </div>
        <button type="submit">Reservar</button>
        <button type="button" onClick={handleBackToDetails}>Atrás</button>
      </form>
    </div>
  );
};

export default MovieReservationForm;