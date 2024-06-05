//MovieForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/movieform.css';

function MovieForm() {
  const navigate = useNavigate();
  // State para almacenar los valores del formulario
  const [formData, setFormData] = useState({
    id: 0,
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
    image: null,
    trailer: '',
    ageRating: '',
    duration: 0,
    url: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      originalVersion: name === 'originalVersion' ? checked : !checked,
      spanishVersion: name === 'spanishVersion' ? checked : !checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('PELICULA', JSON.stringify(formData));

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'image') {
        formDataToSend.append(key, formData[key], formData[key].name);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });
    try {
      const response = await fetch('/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: formDataToSend,
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
            onChange={handleCheckboxChange}
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
            onChange={handleCheckboxChange}
          />
          Versión en Español
        </label>
      </div>
      <div>
        <label htmlFor="image">Imagen:</label>
        <input
          type="file"
          id="image"
          name="image"
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
      <button type="submit">Agregar Película</button>
      <button onClick={handleBackClick}>Volver</button>
    </form>
  );
}

export default MovieForm;