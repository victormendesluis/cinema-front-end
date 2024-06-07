import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../style/movieform.css';

function MovieEditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  // State para almacenar los valores del formulario
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    origTitle: '',
    release: '',
    genres: '',
    actors: '',
    directors: '',
    script: '',
    producers: '',
    synopsis: '',
    originalVersion: false,
    spanishVersion: true,
    image: '',
    trailer: '',
    ageRating: '',
    duration: 0
  });
  
  //const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`/movies/${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        //setError(error.message);
        console.log(error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/movies/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if(data){
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBackClick = () => {
    navigate('/movies');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="id">ID:</label>
        <input
          type="text"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="origTitle">Título Original:</label>
        <input
          type="text"
          id="origTitle"
          name="origTitle"
          value={formData.origTitle}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="release">Fecha de Estreno:</label>
        <input
          type="date"
          id="release"
          name="release"
          value={formData.release}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="genres">Géneros:</label>
        <input
          type="text"
          id="genres"
          name="genres"
          value={formData.genres}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="actors">Actores:</label>
        <input
          type="text"
          id="actors"
          name="actors"
          value={formData.actors}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="directors">Directores:</label>
        <input
          type="text"
          id="directors"
          name="directors"
          value={formData.directors}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="script">Guionistas:</label>
        <input
          type="text"
          id="script"
          name="script"
          value={formData.script}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="producers">Productores:</label>
        <input
          type="text"
          id="producers"
          name="producers"
          value={formData.producers}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="synopsis">Sinopsis:</label>
        <textarea
          id="synopsis"
          name="synopsis"
          value={formData.synopsis}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="originalVersion"
            checked={formData.originalVersion}
            onChange={handleChange}
          />
          Versión Original
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="spanishVersion"
            checked={formData.spanishVersion}
            onChange={handleChange}
          />
          Versión en Español
        </label>
      </div>
      <div>
        <label htmlFor="image">URL de la Imagen:</label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="trailer">URL del Trailer:</label>
        <input
          type="text"
          id="trailer"
          name="trailer"
          value={formData.trailer}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="ageRating">Clasificación por Edad:</label>
        <input
          type="text"
          id="ageRating"
          name="ageRating"
          value={formData.ageRating}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="duration">Duración (minutos):</label>
        <input
          type="number"
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Actualizar Película</button>
      <button onClick={handleBackClick}>Volver</button>
    </form>
  );
}

export default MovieEditForm;