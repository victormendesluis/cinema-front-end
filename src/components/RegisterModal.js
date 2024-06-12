import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const RegisterModal = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Usuario Registrado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>¡El usuario se ha registrado correctamente!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterModal;