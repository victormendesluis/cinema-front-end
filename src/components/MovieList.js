import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

const MovieList = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
    setLoading(false);
  }, []);

  const fetchMovies = () => {
    fetch('/movies')
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.error('Error fetching movies:', error));
  };

  const handleEdit = (movie) => {
    navigate(`/movies/${movie.id}/edit`);
  };

  const handleDelete = (movieId) => {
    // Aquí puedes implementar la lógica para borrar la película
    //console.log("Borrar película con ID:", movieId);
    // Por ejemplo, una solicitud DELETE a la API
    fetch(`/movies/${movieId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          // Si la eliminación fue exitosa, actualiza la lista de películas
          fetchMovies();
        } else {
          console.error('Error al borrar película');
        }
      })
      .catch(error => console.error('Error al borrar película:', error));
  };

  const handleBackClick = () => {
    navigate('/');
  };

  const handleInsertClick = () => {
    navigate('/movies/register');
  };

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
          <h2>Todas las películas</h2>
          <table className="table table-striped">
          <thead className="thead-dark">
              <tr>
              <th>Titulo</th>
              <th>Director</th>
              <th>Año</th>
              <th>Acciones</th>
              </tr>
          </thead>
          <tbody>
              {movies.map(movie => (
              <tr key={movie.id}>
                  <td>{movie.title}</td>
                  <td>{movie.directors}</td>
                  <td>{movie.release}</td>
                  <td>
                  <button className="btn btn-primary mr-2" onClick={() => handleEdit(movie)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(movie.id)}>Borrar</button>
                  </td>
              </tr>
              ))}
          </tbody>
          </table>
          <button className="btn btn-primary mb-3" onClick={handleInsertClick}>Añadir Película</button>
          <button className="btn btn-secondary mb-3" onClick={handleBackClick}>Atrás</button>
      </div>
    )}
    </div>
  );
};

export default MovieList;