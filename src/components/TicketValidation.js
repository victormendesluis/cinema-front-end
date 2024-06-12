import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingModal from './BookingModal'; // Importa el nuevo componente modal
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const TicketValidation = () => {
  const [formData, setFormData] = useState({
    identifier: '',
    file: null,
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.file) {
      const formDataToSend = new FormData();
      formDataToSend.append('file', formData.file);
      try {
        const response = await fetch('/bookings/decodeQR/validate', {
          method: 'POST',
          body: formDataToSend,
        });
        const data = await response.json();
        if (response.ok) {
          console.log('BOOKING', data);
          setBookingData(data);
          setModalIsOpen(true);
        } else {
          console.log('Ha ocurrido un error');
        }
      } catch (error) {
        console.error('Error al validar el ticket', error);
      }
    } else {
      const body = { identifier: formData.ticket };
      try {
        const response = await fetch('/bookings/validate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        if (response.ok) {
          console.log('BOOKING', data);
          setBookingData(data);
          setModalIsOpen(true);
        } else {
          console.log('Ha ocurrido un error');
        }
      } catch (error) {
        console.error('Error al validar el ticket', error);
      }
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    navigate(`/`);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="ticket">Introduce tu Código</label>
          <input
            className="form-input"
            type="text"
            id="ticket"
            name="ticket"
            value={formData.ticket}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="file">o Escanea tu QR</label>
          <input
            className="form-input"
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
          />
        </div>
        <button className="login-button btn btn-primary" type="submit">Validar Ticket</button>
        <button className="btn btn-secondary mb-3" onClick={() => navigate(`/`)}>Atrás</button>
      </form>

      <BookingModal
        show={modalIsOpen}
        handleClose={closeModal}
        bookingData={bookingData}
      />
    </div>
  );
};

export default TicketValidation;