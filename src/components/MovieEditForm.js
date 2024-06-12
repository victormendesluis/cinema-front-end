import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../style/movieform.css';

function MovieEditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  // State para almacenar los valores del formulario
  const [formData, setFormData] = useState({
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
    releaseFile: null,
    coverFile: null,
    trailer: '',
    ageRating: '',
    duration: 0
  });

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

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('PELICULA', JSON.stringify(formData));

    const formDataToSend = new FormData();
    const movieData = {
      title: formData.title,
      origTitle: formData.origTitle,
      release: formData.release,
      genres: formData.genres,
      actors: formData.actors,
      directors: formData.directors,
      script: formData.script,
      producers: formData.producers,
      synopsis: formData.synopsis,
      originalVersion: formData.originalVersion,
      spanishVersion: formData.spanishVersion,
      image: formData.releaseFile.name,
      trailer: formData.trailer,
      ageRating: formData.ageRating,
      duration: formData.duration,
      url: formData.url
    };

    formDataToSend.append('movie', new Blob([JSON.stringify(movieData)], { type: 'application/json' }));

    if (formData.releaseFile) {
      formDataToSend.append('releaseFile', formData.releaseFile, formData.releaseFile.name);
    }

    if (formData.coverFile) {
      formDataToSend.append('coverFile', formData.coverFile, formData.coverFile.name);
    }

    try {
      const response = await fetch(`/movies/${id}`, {
        method: 'PUT',
        body: formDataToSend,
      });
      const data = await response.json();
      if(data){
        console.log(data);
        navigate('/movies');
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
      <label htmlFor="releaseFile">Cartelera:</label>
        <input
          type="file"
          id="releaseFile"
          name="releaseFile"
          onChange={handleFileChange}
        />
      </div>
      <div>
        <label htmlFor="coverFile">Portada:</label>
        <input
          type="file"
          id="coverFile"
          name="coverFile"
          onChange={handleFileChange}
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