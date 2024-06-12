import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import '../../style/moviedetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [reviewData, setReviewData] = useState(null);
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
    fetchMovieReviews();
  }, [id]);

  const fetchMovieReviews=async ()=>{
    try{
      const response = await fetch(`/movies/${id}/reviews/averageRating`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setReviewData(data);
      setLoading(false);
    }catch(error){
      setError(error.message);
      setLoading(false);
    }

  }

  const handleBackClick = () => {
    navigate('/');
  };

  const handleReserveClick = () =>{
    if(localStorage.getItem('token')){
      navigate(`/reserve/${id}`, { state: { movieTitle: formData.title } });
    }
  }

  const handleReviewsClick = ()=>{

  }

  if (loading) {
    return <div>    
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
           </div>;
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <img src={'/uploads/release-'+formData.image} alt={formData.title} className="movie-image" />
          <iframe
          width="560"
          height="315"
          src={formData.trailer}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          ></iframe>
          <button type='button' onClick={handleReviewsClick}>Ver opiniones</button>
        </div>
        <div className='col'>
          <p className='movie-p'><strong>Título Original: </strong> {formData.origTitle}</p>
          <p className='movie-p'><strong>Fecha de Estreno: </strong> {formData.release}</p>
          <p className='movie-p'><strong>Géneros: </strong> {formData.genres}</p>
          <p className='movie-p'><strong>Actores: </strong> {formData.actors}</p>
          <p className='movie-p'><strong>Directores: </strong> {formData.directors}</p>
          <p className='movie-p'><strong>Guionistas: </strong> {formData.script}</p>
          <p className='movie-p'><strong>Productores: </strong> {formData.producers}</p>
          <p className='movie-p'><strong>Sinopsis: </strong> {formData.synopsis}</p>
          <p className='movie-p'><strong>Versión Original: </strong> {formData.originalVersion ? 'Sí' : 'No'}</p>
          <p className='movie-p'><strong>Versión en Español: </strong> {formData.spanishVersion ? 'Sí' : 'No'}</p>
          <p className='movie-p'><strong>Clasificación por Edad: </strong> {formData.ageRating}</p>
          <p className='movie-p'><strong>Duración: </strong> {formData.duration} minutos</p>
          <p className='movie-p'><strong>Rating: </strong>{reviewData}</p>
          <div>
            <button onClick={handleReserveClick} className="back-button">Reservar</button>
            <button onClick={handleBackClick} className="back-button">Volver</button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default MovieDetails;