import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import '../style/movielist.css'; // Asegúrate de tener este archivo para los estilos

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="movie-list">
      <h2>Lista de Películas</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <div className="movie-card">
                <img src={movie.image} alt={movie.title} />
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <p>{movie.release}</p>
                </div>
              </div>
            </Link>
            <MovieCard movie={movie}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;