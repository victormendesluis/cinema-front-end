import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';
import '../style/moviepage.css'; // Asegúrate de tener este archivo para los estilos

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Lista de Películas</h2>
      <div className="movie-list">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie}/>
        ))}
      </div>

      <div>
      <h2>Cartelera</h2>
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="d-flex flex-wrap">
          {movies.map(movie => (
            <img
              key={movie.id}
              src={movie.image}
              alt={movie.title}
              className="img-thumbnail m-2"
              style={{ cursor: 'pointer' }}
              onClick={() => handleClick(movie.id)}
            />
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default MoviePage;