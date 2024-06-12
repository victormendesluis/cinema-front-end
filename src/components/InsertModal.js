import React from 'react';
import '../style/modal.css';

const InsertModal = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Elemento añadido</h2>
        <p>Elemento añadido correctamente!</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default InsertModal;