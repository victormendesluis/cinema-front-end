import React, { useState } from 'react';
import { Navbar, Nav, Modal, Button, Form, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const TopBar = ({ user, onLogin, onLogout }) => {
  const [show, setShow] = useState(false);
  const [credentials, setCredentials] = useState({ identifier: '', password: '' });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.id);
        localStorage.setItem('logged',true);
        if(data.admin){
          localStorage.setItem('admin', data.admin);
        }
        onLogin(data);
      } else {
        console.error('Error de autenticación:', data.message);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
    setCredentials('');
    handleClose();
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">Filmmes</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
          {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <FontAwesomeIcon icon={faUser} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href='/users/${user.id}'>Perfil</Dropdown.Item>
                  {localStorage.getItem('admin') && <Dropdown.Item href="/movies">Películas</Dropdown.Item>}
                  {localStorage.getItem('admin') && <Dropdown.Item href="/users">Usuarios</Dropdown.Item>}
                  {localStorage.getItem('admin') && <Dropdown.Item href="/screenings">Programación</Dropdown.Item>}
                  <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Nav.Link onClick={handleShow}>
                <FontAwesomeIcon icon={faUser} />
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Usuario</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Introduce tu nombre de usuario" 
                name="identifier"
                value={credentials.identifier} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Contraseña" 
                name="password"
                value={credentials.password} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Iniciar Sesión
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TopBar;