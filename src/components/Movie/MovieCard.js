import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa Link desde react-router-dom
import '../../style/moviecard.css';

function MovieCard({ movie }) {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/movies/${id}`);
  };

  return (
    <div className="movie-card" onClick={()=>handleClick(movie.id)}>
      <img src={'/uploads/'+movie.image} alt={movie.title} />
    </div>
  );
}

export default MovieCard;