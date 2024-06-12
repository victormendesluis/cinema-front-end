import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

const MovieList = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [searchQuery, setSearchQuery] = useState('');
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

  const sortedMovies = useMemo(() => {
    let sortableMovies = [...movies];
    if (searchQuery) {
      sortableMovies = sortableMovies.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.directors.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (sortConfig !== null) {
      sortableMovies.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableMovies;
  }, [movies, sortConfig, searchQuery]);

  const requestSort = key => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getClassNamesFor = key => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === key ? sortConfig.direction : undefined;
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
          <Form.Control
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="mb-3"
          />
          <table className="table table-striped">
          <thead className="thead-dark">
              <tr>
              <th onClick={() => requestSort('title')}>Titulo <span className={getClassNamesFor('title')}></span></th>
              <th onClick={() => requestSort('directors')}>Director <span className={getClassNamesFor('directors')}></span></th>
              <th>Año</th>
              <th></th>
              </tr>
          </thead>
          <tbody>
              {sortedMovies.map(movie => (
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