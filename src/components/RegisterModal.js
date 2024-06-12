import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

const RegisterModal = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <Modal>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación del registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Usuario registrado correctamente!</p>
            <button onClick={onClose}>Cerrar</button>
        </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;