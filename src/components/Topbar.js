import React, { useState } from 'react';
import { Navbar, Nav, Modal, Button, Form, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const TopBar = ({ user, onLogin, onLogout }) => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/users', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      //console.log('LOGIN BLYAT', data[0].nickname);
      if (response.ok) {
        if(data[0].nickname===username){
          // Guarda el token en localStorage
          localStorage.setItem('token', data[0].id);
          localStorage.setItem('logged',true);
          onLogin(data[0]);
          // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
        }else{
          console.log("Usuario o contraseña incorrectas");
        }
      } else {
        console.error('Error de autenticación:', data.message);
        // Maneja el error de autenticación, muestra mensajes de error, etc.
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Maneja el error, muestra mensajes de error, etc.
    }
    //console.log({ username, password });
    setUsername('');
    setPassword('')
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
                  {!user.admin && <Dropdown.Item href="/movies">Películas</Dropdown.Item>}
                  {!user.admin && <Dropdown.Item href="/users">Usuarios</Dropdown.Item>}
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
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Contraseña" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
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