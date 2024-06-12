import React, { useState, useEffect, useMemo } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

const ScreenList = () => {
  const [screens, setScreens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllScreens = async () => {
      try {
        const response = await fetch('/screens');
        if (response.ok) {
          const data = await response.json();
          setScreens(data);
        } else {
          console.error('Error al obtener las funciones.');
        }
      } catch (error) {
        console.error('Error al obtener las funciones:', error);
      }
    };

    fetchAllScreens();
    setLoading(false);
  }, []);

  const sortedScreens = useMemo(() => {
    let sortableScreens = [...screens];
    if (searchQuery) {
      sortableScreens = sortableScreens.filter(screen =>
        screen.supports.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (sortConfig !== null) {
      sortableScreens.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableScreens;
  }, [screens, sortConfig, searchQuery]);

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
    navigate(`/screens/add`);
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
        <h2>Todas las Salas</h2>
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
              <th onClick={() => requestSort('supports')} >
                Sala<span className={getClassNamesFor('supports')}></span>
              </th>
              <th>Asientos</th>
            </tr>
          </thead>
          <tbody>
            {sortedScreens.map(screen => (
              <tr key={screen.id}>
                <td>{screen.cinemaName}</td>
                <td>{screen.supports}</td>
                <td>{screen.seats.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button className="btn btn-primary mb-3" onClick={handleAddClick}>Añadir Sala</button>
          <button className="btn btn-secondary mb-3" onClick={handleBackClick}>Atrás</button>
        </div>
      </div>
      )}
    </div>
  );
};

export default ScreenList;