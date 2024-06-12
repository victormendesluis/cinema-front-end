import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const BookingModal = ({ show, handleClose, bookingData }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Datos de la Reserva</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {bookingData ? (
          <div>
            <p>Sus entradas son validas. Aqui tiene la información</p>
            <p>Película: {bookingData[0].screeningDTO.movieTitle}, Sala {bookingData[0].screeningDTO.screen}</p>
            {bookingData.map(seat=>(
                <p>Asiento: {seat.rowAndSeat} - Precio: {seat.totalPrice}€</p>
            ))}
            <p>Disfrute de la película!</p>
          </div>
        ) : (
          <p>No se encontraron datos de la reserva.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookingModal;