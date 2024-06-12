import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';


const ScreeningsList = () => {
  const [screenings, setScreenings] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simular fetch a la API para obtener todas las funciones
    // Reemplaza esto con tu llamada real a la API
    const fetchAllScreenings = async () => {
      try {
        const response = await fetch('/screenings');
        if (response.ok) {
          const data = await response.json();
          setScreenings(data);
          setLoading(false);
        } else {
          console.error('Error al obtener las funciones.');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error al obtener las funciones:', error);
      }
    };

    fetchAllScreenings();
  }, []);

  const sortedScreenings = useMemo(() => {
    let sortableScreenings = [...screenings];
    if (searchQuery) {
      sortableScreenings = sortableScreenings.filter(screening =>
        screening.movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (sortConfig !== null) {
      sortableScreenings.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableScreenings;
  }, [screenings, sortConfig, searchQuery]);

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

  const handleBackClick = () => {
    navigate(`/`);
  };

  const handleAddClick = () => {
    navigate(`/screenings/add`);
  };

  const handleEditClick = (id) => {
    navigate(`/screenings/${id}/edit`);
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
          <h2>Todas las Funciones</h2>
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
                <th>Cine</th>
                <th>Sala</th>
                <th>Título de la película</th>
                <th>Día de la proyección</th>
                <th>Hora de inicio de la proyección</th>
                <th>Audio</th>
                <th>Precio de la sala</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sortedScreenings.map(screening => (
                <tr key={screening.id}>
                  <td>{screening.screen.cinema.name}</td>
                  <td>{screening.screen.id}</td>
                  <td>{screening.movie.title}</td>
                  <td>{screening.dayFromStartTime}</td>
                  <td>{screening.timeFromStarTime}</td>
                  <td>{screening.audio}</td>
                  <td>{screening.price}</td>
                  <td><button className="btn btn-primary mr-2" onClick={()=>handleEditClick(screening.id)}>Editar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button className="btn btn-primary mb-3" onClick={handleAddClick}>Añadir Sesión</button>
            <button className="btn btn-secondary mb-3" onClick={handleBackClick}>Atrás</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScreeningsList;