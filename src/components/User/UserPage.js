import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch('/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching users:', error));
  };

  const handleEdit = (user) => {
    navigate(`/users/${user.id}/edit`)
  };

  const handleDelete = (usuario) => {
    fetch(`/users/${usuario.id}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            // Eliminar el usuario localmente después de la eliminación exitosa
            const updatedUsers = users.filter(user => user.id !== usuario.id);
            setUsers(updatedUsers);
            console.log("Usuario borrado con éxito");
          } else {
            console.error('Error al borrar usuario');
          }
        })
        .catch(error => console.error('Error al borrar usuario:', error));
  };

  const handleBackClick = () => {
    navigate('/');
  };

  const handleInsertClick = () => {
    navigate('/users/register');
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
          <h1>Lista de Usuarios</h1>
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button className="btn btn-primary mr-2" onClick={() => handleEdit(user)}>Editar</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(user)}>Borrar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-primary mb-3" onClick={handleInsertClick}>Añadir Usuario</button>
          <button className="btn btn-secondary mb-3" onClick={handleBackClick}>Atrás</button>
        </div>
      )}

    </div>
  );
};

export default UserPage;