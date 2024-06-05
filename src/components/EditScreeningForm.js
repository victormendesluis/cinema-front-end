import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../style/form.css';  // Importar el archivo CSS

const AddScreeningForm = () => {
  const{ id } = useParams();
  const [formData, setFormData] = useState({
    cinemaName: 'CinemaMM',
    screen: 0,
    movieTitle: '',
    screeningDayAndHourDTO: {
      screeningDay: '',
      screeningStartTime: '',
    },
    audio: '',
    screenPrice: 0,
  });

  const [movies, setMovies] = useState([]);
  const [screens, setScreens] = useState([]);
  const [screening, setScreening] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScreening = async () => {
        try {
          const response = await fetch(`/screenings/${id}`);
          if (response.ok) {
            const data = await response.json();
            setScreening(data);
          } else {
            console.error('Error al obtener las funciones.');
          }
        } catch (error) {
          console.error('Error al obtener las funciones:', error);
        }
      };

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
      formData.screeningDayAndHourDTO.screeningDay=formatDateString(formData.screeningDayAndHourDTO.screeningDay);
      const response = await fetch('/screenings', {
        method: 'PUT',
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
            value={screening.screen}
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
            value={screening.movieTitle}
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
            value={screening.screeningDayAndHourDTO.screeningDay}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Hora de inicio de la proyección:</label>
          <input
            type="time"
            name="screeningStartTime"
            value={screening.screeningDayAndHourDTO.screeningStartTime}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Audio:</label>
          <input
            type="text"
            name="audio"
            value={screening.audio}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Precio de la sala:</label>
          <input
            type="number"
            name="screenPrice"
            value={screening.screenPrice}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Modificar Proyección</button>
        <button onClick={handleBackClick}>Atrás</button>
      </form>
    </div>
  );
};

export default AddScreeningForm;