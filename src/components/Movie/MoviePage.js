import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';
import Spinner from 'react-bootstrap/Spinner';
import Carousel from 'react-bootstrap/Carousel';
import '../../style/moviepage.css'; // Asegúrate de tener este archivo para los estilos

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/movies'); // Ajusta la URL según tu API
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        
        setMovies(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleClick = (id) => {
    navigate(`/movies/${id}`);
  };

  if (loading) return <div>
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden">Cargando...</span>
                        </Spinner>
                      </div>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {loading ? (
        <div>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      ) : (
        <div>
          <h2>Estrenos</h2>
          <Carousel>
          {movies.map(movie => (
            <Carousel.Item interval={2000}>
              <div className='text-center'>
                <img 
                  key={movie.id}
                  src={'/uploads/release-'+movie.image}
                  alt={movie.title}
                  className="d-block"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleClick(movie.id)}
                />
              </div>
            </Carousel.Item>
          ))}
          </Carousel>
          <h2>Cartelera</h2>
            <div className="movie-list">
              {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </div>
        </div>
      )}
    </div>
  );
};

export default MoviePage;