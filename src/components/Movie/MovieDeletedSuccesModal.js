import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const MovieDeletedSuccessModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Película Borrada</Modal.Title>
      </Modal.Header>
      <Modal.Body>La película ha sido borrado con éxito.</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MovieDeletedSuccessModal;