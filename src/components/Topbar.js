import React, { useState } from 'react';
import { Navbar, Nav, Modal, Button, Form, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import RegisterModal from './RegisterModal';

const TopBar = ({ user, onLogin, onLogout }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [credentials, setCredentials] = useState({ identifier: '', password: '' });
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone:'',
    nickname:'',
    password: '',
    confirmPassword:'',
    points: 100,
    premium: false,
    admin: false,
    token: '',
    recover_code: ''
  });
  const [showModal, setShowModal]=useState(false);
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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //HANDLE LOGIN FORM
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
  //HANDLE REGISTER FORM
  const handleFormSubmit = async (e) => {
    e.preventDefault();;
    try {
      if(formData.password===formData.confirmPassword){
        const response = await fetch('/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        setShowModal(true);
        handleCloseRegister();
        setTimeout(() => 
          setShowModal(false), 5000);
      }else{
        alert('Las contraseñas no coinciden.')
      }
      // Aquí puedes manejar la respuesta de la API, mostrar mensajes de éxito, etc.
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      // Aquí puedes manejar el error, mostrar mensajes de error, etc.
    }
  };

  return (
    <div className='topbar'>
    <>
      <Navbar className='justify-content-between' bg="dark" variant='dark' expand="lg">
        <Navbar.Brand href="/"><img src="logo.jpg" width={50}></img>FilMM</Navbar.Brand>
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
          <Form onSubmit={handleFormSubmit}>
            <Form.Group>
              <Form.Label>Nombre:</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Introduce tu nombre" 
                name="name"
                value={formData.firstName} 
                onChange={handleFormChange} 
                required 
              />
              <Form.Label>Apellidos:</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Introduce tus apellidos" 
                name="surname"
                value={formData.lastName}
                onChange={handleFormChange} 
                required 
              />
              <Form.Label>Correo Electrónico:</Form.Label>
              <Form.Control 
                type="email"
                id="email"
                name="email"
                placeholder="Introduce tu correo electrónico" 
                value={formData.email}
                onChange={handleFormChange} 
                required 
              />
              <Form.Label>Teléfono:</Form.Label>
              <Form.Control 
                type="numeric" 
                placeholder="Introduce tu número de teléfono" 
                name="phone"
                value={formData.phone} 
                onChange={handleFormChange} 
                required 
              />
              <Form.Label>Nombre de usuario:</Form.Label>
              <Form.Control 
                type="numeric" 
                placeholder="Introduce tu nombre de usuario" 
                name="nickname"
                value={formData.nickname} 
                onChange={handleFormChange} 
                required 
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Introduzca su contraseña" 
                name="password"
                value={formData.password} 
                onChange={handleFormChange} 
                required 
              />
              <Form.Label>Confirmar Contraseña:</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Repita su contraseña" 
                name="confirmPassword"
                value={formData.confirmPassword} 
                onChange={handleFormChange} 
                required 
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Registrarse
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <RegisterModal show={showModal} onClose={()=>setShowModal(false)}></RegisterModal>
    </>
    </div>
  );
};

export default TopBar;