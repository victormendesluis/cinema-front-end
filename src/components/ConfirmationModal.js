import React from 'react';
import '../style/modal.css';

const ConfirmationModal = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Reserva Confirmada</h2>
        <p>¡Gracias por su reserva! Será redirigido en breve...</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default ConfirmationModal;