import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ScreeningDeletedSuccessModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Función Borrada</Modal.Title>
      </Modal.Header>
      <Modal.Body>La función ha sido borrada con éxito.</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ScreeningDeletedSuccessModal;