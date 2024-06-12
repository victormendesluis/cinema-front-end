import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../style/form.css';  // Importar el archivo CSS

const EditScreeningForm = () => {
  const{ id } = useParams();
  const [formData, setFormData] = useState({
    id: 0,
    movie: {
      id: 0,
      title: "",
      origTitle: "",
      release: "",
      genres: "",
      actors: "",
      directors: "",
      script: "",
      producers: "",
      synopsis: "",
      originalVersion: true,
      spanishVersion: true,
      image: "",
      trailer: "",
      ageRating: "",
      duration: 0
    },
    screen: {
      id: 0,
      cinema: {
        id: 0,
        name: "",
        address: "",
        phone: "",
        email: ""
      },
      supports: ""
    },
    start_time: "",
    audio: "",
    price: 0,
    endTime: "",
    dayFromStartTime: "",
    timeFromStarTime: ""
  });

  const [movies, setMovies] = useState([]);
  const [screens, setScreens] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScreening = async () => {
        try {
          const response = await fetch(`/screenings/${id}`);
          if (response.ok) {
            const data = await response.json();
            setFormData(data);
            console.log('SCREENING', data);
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
          console.log('PELICULAS', data);
        } else {
          console.error('Error al obtener las películas.');
        }
      } catch (error) {
        console.error('Error al obtener las películas:', error);
      }
    };

    const fetchScreens = async () => {
      try {
        const response = await fetch(`/screens`);
        if (response.ok) {
          const data = await response.json();
          setScreens(data);
          console.log('SALAS',screens);
        } else {
          console.error('Error al obtener las salas.');
        }
      } catch (error) {
        console.error('Error al obtener las salas:', error);
      }
    };

    fetchScreening();
    fetchMovies();
    fetchScreens();
  }, [id]);

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

  const formatDateString = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //console.log('DATA', formData);
      //formData.screen.screeningDayAndHourDTO.screeningDay=formatDateString(formData.screen.screeningDayAndHourDTO.screeningDay);
      const response = await fetch(`/screening/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Proyección modificada exitosamente.');
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
      <h2>Modificar Proyección</h2>
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
            name="dayFromStartTime"
            value={formData.dayFromStartTime}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Hora de inicio de la proyección:</label>
          <input
            type="time"
            name="timeFromStarTime"
            value={formData.timeFromStarTime}
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
            name="price"
            value={formData.price}
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

export default EditScreeningForm;