import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const UserDeleteConfirmationModal = ({ show, handleClose, handleConfirm }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Borrado</Modal.Title>
      </Modal.Header>
      <Modal.Body>¿Estás seguro de que deseas borrar a este usuario?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Borrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDeleteConfirmationModal;