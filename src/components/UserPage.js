import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const handleEdit = (userId) => {
    navigate(`/users/${userId}/edit`)
  };

  const handleDelete = (userId) => {
    fetch(`/users/${userId}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            // Eliminar el usuario localmente después de la eliminación exitosa
            const updatedUsers = users.filter(user => user.id !== userId);
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
      <h1>Lista de Usuarios</h1>
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button className="btn btn-primary mr-2" onClick={() => handleEdit(user)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="btn btn-primary mb-3" onClick={handleBackClick}>Atrás</button>
      <button className="btn btn-primary mb-3" onClick={handleInsertClick}>Añadir Usuario</button>
    </div>
  );
};

export default UserPage;