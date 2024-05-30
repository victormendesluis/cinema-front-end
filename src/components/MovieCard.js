import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import '../style/moviecard.css';

function MovieCard({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`}>
    <div className="movie-card">
        <img src={movie.image} alt={movie.title} />
        <div className="movie-info">
          <h2>{movie.title}</h2>
          <p>{movie.genres}</p>
          <p>{movie.release}</p>
        </div>
    </div>
    </Link>
  );
}

export default MovieCard;