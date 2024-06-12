import React, { useState, useEffect, useMemo } from 'react';
import { Table, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../style/elementsTable.css';
import DeleteConfirmationModal from './UserDeleteConfirmationModal';
import SuccessModal from './UserDeletedSuccesModal';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
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

  const sortedUsers = useMemo(() => {
    let sortableUsers = [...users];
    if (searchQuery) {
      sortableUsers = sortableUsers.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (sortConfig !== null) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [users, sortConfig, searchQuery]);

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

  const handleDelete = (usuario) => {
    setUserToDelete(usuario);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    fetch(`/users/${userToDelete.id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        setShowDeleteModal(false);
        setShowSuccessModal(true);
        fetchUsers();
      } else {
        console.error('Error al borrar usuario');
      }
    })
    .catch(error => console.error('Error al borrar usuario:', error));
  };

  const handleEdit = (user) => {
    navigate(`/users/${user.id}/edit`);
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
          <Form.Control
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="mb-3"
          />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th onClick={() => requestSort('name')}>
                  Nombre
                  <span className={getClassNamesFor('name')}></span>
                </th>
                <th onClick={() => requestSort('email')}>
                  Email
                  <span className={getClassNamesFor('email')}></span>
                </th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button className="btn btn-primary mr-2" onClick={() => handleEdit(user)}>Editar</button>
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleDelete(user)}>Borrar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className='container'>
            <button className="btn btn-primary mb-3" onClick={handleInsertClick}>Añadir Usuario</button>
            <button className="btn btn-secondary mb-3" onClick={handleBackClick}>Atrás</button>
          </div>
        </div>
      )}

      <DeleteConfirmationModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleConfirm={confirmDelete}
      />

      <SuccessModal
        show={showSuccessModal}
        handleClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
};

export default UserPage;