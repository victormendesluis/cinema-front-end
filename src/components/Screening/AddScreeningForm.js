import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/form.css';  // Importar el archivo CSS

const AddScreeningForm = () => {
  const [formData, setFormData] = useState({
    cinemaName: 'FilMM',
    screen: 0,
    movieTitle: '',
    screeningDayAndHourDTO: {
      screeningDay: '',
      screeningStartTime: '',
    },
    audio: '',
    screeningPrice: '',
  });

  const [movies, setMovies] = useState([]);
  const [screens, setScreens] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simular fetch a la API para obtener las películas
    // Reemplaza esto con tu llamada real a la API
    const fetchMovies = async () => {
      try {
        const response = await fetch('/movies');
        if (response.ok) {
          const data = await response.json();
          setMovies(data);
        } else {
          console.error('Error al obtener las películas.');
        }
      } catch (error) {
        console.error('Error al obtener las películas:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('screeningDay') || name.includes('screeningStartTime')) {
      setFormData({
        ...formData,
        screeningDayAndHourDTO: {
          ...formData.screeningDayAndHourDTO,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    // Fetch screens based on selected cinema
    const fetchScreens = async () => {
      try {
        const response = await fetch(`/screens`);
        if (response.ok) {
          const data = await response.json();
          setScreens(data);
          //console.log('SALAS',screens);
        } else {
          console.error('Error al obtener las salas.');
        }
      } catch (error) {
        console.error('Error al obtener las salas:', error);
      }
    };

    fetchScreens();
  }, []);

  const formatDateString = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //console.log('PREFORMATEO', formData.screeningDayAndHourDTO.screeningDay);
      formData.screeningDayAndHourDTO.screeningDay=formatDateString(formData.screeningDayAndHourDTO.screeningDay);
      //console.log('FECHA', formData.screeningDayAndHourDTO.screeningDay, typeof(formData.screeningDayAndHourDTO.screeningDay));
      //console.log('HORAS', formData.screeningDayAndHourDTO.screeningStartTime, typeof(formData.screeningDayAndHourDTO.screeningStartTime));
      //console.log('SCREENING', formData);
      const response = await fetch('/screenings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Proyección añadida exitosamente.');
        navigate('/');
      } else {
        alert('Error al añadir la proyección.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al añadir la proyección.');
    }
  };

  const handleBackClick = () => {
    navigate(`/screenings`);
  };

  return (
    <div className="container">
      <h2>Añadir Nueva Proyección</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label>Sala:</label>
          <select
            name="screen"
            value={formData.screen}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una sala</option>
            {screens.map((screen) => (
              <option key={screen.id} value={screen.id}>
                {screen.id}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Título de la película:</label>
          <select
            name="movieTitle"
            value={formData.movieTitle}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una película</option>
            {movies.map((movie) => (
              <option key={movie.id} value={movie.title}>
                {movie.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Día de la proyección:</label>
          <input
            type="date"
            name="screeningDay"
            value={formData.screeningDayAndHourDTO.screeningDay}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Hora de inicio de la proyección:</label>
          <input
            type="time"
            name="screeningStartTime"
            value={formData.screeningDayAndHourDTO.screeningStartTime}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Audio:</label>
          <input
            type="text"
            name="audio"
            value={formData.audio}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Precio de la sala:</label>
          <input
            type="number"
            name="screeningPrice"
            value={formData.screeningPrice}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Añadir Proyección</button>
        <button onClick={handleBackClick}>Atrás</button>
      </form>
    </div>
  );
};

export default AddScreeningForm;