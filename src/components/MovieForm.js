//MovieForm.js
import React, { useState } from 'react';
import '../style/movieform.css';

function MovieForm() {
  // State para almacenar los valores del formulario
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    originalTitle: '',
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a un servidor
    console.log('Datos del formulario:', formData);
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
        <label htmlFor="originalTitle">Título Original:</label>
        <input
          type="text"
          id="originalTitle"
          name="originalTitle"
          value={formData.originalTitle}
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
      <button type="submit">Agregar Película</button>
    </form>
  );
}

export default MovieForm;