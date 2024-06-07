import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

const ScreenList = () => {
  const [screens, setScreens] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const handleBackClick = () => {
    navigate(`/`);
  };

  const handleAddClick = () => {
    navigate(`/screens/add`);
  };

  const handleEditClick = (screen) => {
    navigate(`/screens/${screen.id}/edit`);
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
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Cine</th>
              <th>Sala</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {screens.map(screen => (
              <tr key={screen.id}>
                <td>{screen.cinema.name}</td>
                <td>{screen.supports}</td>
                <td><button className="btn btn-primary mr-2" onClick={()=>handleEditClick(screen)}>Editar</button></td>
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