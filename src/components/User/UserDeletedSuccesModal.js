import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const UserDeletedSuccessModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Usuario Borrado</Modal.Title>
      </Modal.Header>
      <Modal.Body>El usuario ha sido borrado con éxito.</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDeletedSuccessModal;