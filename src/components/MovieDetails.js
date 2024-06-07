import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../style/moviedetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`/movies/${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setFormData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleBackClick = () => {
    navigate('/');
  };

  const handleReserveClick = () =>{
    navigate(`/reserve/${id}`, { state: { movieTitle: formData.title } });
  }

  if (loading) {
    return <div>    
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
           </div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!formData) {
    return <div>No data found</div>;
  }

  return (
    <div className="movie-details">
      <h1>{formData.title}</h1>
      <img src={formData.image} alt={formData.title} className="movie-image" />
      <p><strong>Título Original:</strong> {formData.origTitle}</p>
      <p><strong>Fecha de Estreno:</strong> {formData.release}</p>
      <p><strong>Géneros:</strong> {formData.genres}</p>
      <p><strong>Actores:</strong> {formData.actors}</p>
      <p><strong>Directores:</strong> {formData.directors}</p>
      <p><strong>Guionistas:</strong> {formData.script}</p>
      <p><strong>Productores:</strong> {formData.producers}</p>
      <p><strong>Sinopsis:</strong> {formData.synopsis}</p>
      <p><strong>Versión Original:</strong> {formData.originalVersion ? 'Sí' : 'No'}</p>
      <p><strong>Versión en Español:</strong> {formData.spanishVersion ? 'Sí' : 'No'}</p>
      <p><strong>Clasificación por Edad:</strong> {formData.ageRating}</p>
      <p><strong>Duración:</strong> {formData.duration} minutos</p>
      <iframe
        width="560"
        height="315"
        src={formData.trailer}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <a href={formData.trailer} target="_blank" rel="noopener noreferrer" className="trailer-link">Ver Trailer</a>
      <button onClick={handleReserveClick} className="back-button">Reservar</button>
      <button onClick={handleBackClick} className="back-button">Volver</button>
    </div>
  );
};

export default MovieDetails;