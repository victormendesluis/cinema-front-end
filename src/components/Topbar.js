import React, { useState } from 'react';
import { Navbar, Nav, Modal, Button, Form, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import RegisterForm from './RegisterForm';

const TopBar = ({ user, onLogin, onLogout }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [credentials, setCredentials] = useState({ identifier: '', password: '' });

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

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
    handleCloseLogin();
  };

  return (
    <div className='topbar'>
    <>
      <Navbar className='justify-content-between' bg="dark" variant='dark' expand="lg">
        <Navbar.Brand href="/">Filmmes</Navbar.Brand>
        {/*<Navbar.Toggle aria-controls="basic-navbar-nav" />*/}
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="ml-auto">
            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <FontAwesomeIcon icon={faUser} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href={`/profile`}>Perfil</Dropdown.Item>
                  {localStorage.getItem('admin') && <Dropdown.Item href="/movies">Películas</Dropdown.Item>}
                  {localStorage.getItem('admin') && <Dropdown.Item href="/users">Usuarios</Dropdown.Item>}
                  {localStorage.getItem('admin') && <Dropdown.Item href="/screenings">Programación</Dropdown.Item>}
                  {localStorage.getItem('admin') && <Dropdown.Item href="/screens">Salas</Dropdown.Item>}
                  {localStorage.getItem('admin') && <Dropdown.Item href="/ticket">Validar Ticket</Dropdown.Item>}
                  <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Nav.Link onClick={handleShowLogin}>
                <FontAwesomeIcon icon={faUser} />
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      
      <Modal show={showLogin} onHide={handleCloseLogin}>
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
            <Button variant="secondary" type="reset" onClick={handleShowRegister}>
              Registrarse
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showRegister} onHide={handleCloseRegister}>
        <Modal.Header closeButton>
          <Modal.Title>Registrarse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <RegisterForm/>
        </Modal.Body>
      </Modal>
    </>
    </div>
  );
};

export default TopBar;