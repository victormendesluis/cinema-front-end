import React, { useEffect, useState } from 'react';
import '../style/seatselector.css';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';

function SeatSelection({ seats, screeningId }) {
  const [seatState, setSeatState] = useState(seats);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [userIdentifier, setUser] = useState([]);
  const [screening, setScreening] =useState([]);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    name: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [showModal, setShowModal]=useState(false);
  const navigate = useNavigate();

  const handleSeatClick = (seat) => {
    if (seat.available || selectedSeats.includes(seat.id)) {
      setSelectedSeats((prevSelectedSeats) =>
        prevSelectedSeats.includes(seat.id)
          ? prevSelectedSeats.filter((id) => id !== seat.id)
          : [...prevSelectedSeats, seat.id]
      );

      setSeatState((prevSeats) =>
        prevSeats.map((s) =>
          s.id === seat.id ? { ...s, available: !s.available } : s
        )
      );
    }
  };

  const getUserIdentifier = async () => {
    try {
      const response = await fetch(`/users/${localStorage.getItem('token')}`);
      if (response.ok) {
        const data = await response.json();
        setUser(data.email);
      }
    } catch (error) {
      console.error('Error al recuperar al usuario:', error);
    }
  };

  const getScreening = async () => {
    try {
      const response = await fetch(`/screenings/${screeningId}`);
      if (response.ok) {
        const data = await response.json();
        setScreening(data);
      }
    } catch (error) {
      console.error('Error al recuperar al usuario:', error);
    }
  };

  const renderSeats = () => {
    const rows = {};
    seatState.forEach((seat) => {
      if (!rows[seat.row_number]) {
        rows[seat.row_number] = [];
      }
      rows[seat.row_number].push(seat);
    });

    return Object.keys(rows).map((rowNumber) => (
      <div key={rowNumber} className="seat-row">
        {rows[rowNumber].map((seat) => (
          <div
            key={seat.id}
            className={`seat ${seat.available ? 'available' : 'unavailable'} ${selectedSeats.includes(seat.id) ? 'selected' : ''}`}
            onClick={() => handleSeatClick(seat)}>
          </div>
        ))}
      </div>
    ));
  };

  const handleReserveClick = () => {
    getUserIdentifier();
    getScreening();
    setShowPaymentForm(true);
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/screenings/ticket/buyNoSecurity`, { // Reemplaza con tu endpoint de API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          seats: selectedSeats,
          screening_id: parseInt(screeningId),
          userIdentifier: userIdentifier,
        }),
      });
      console.log(response);
      if (response.ok) {
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate('/')
        }, 3000);
      } else {
        alert('Error al reservar asientos.');
      }
    } catch (error) {
      console.error('Error al reservar asientos:', error);
    }
  };

  const calculatePrice = () => {
    const pricePerSeat = screening.price; // Precio por asiento (puedes cambiarlo según tu lógica)
    return selectedSeats.length * pricePerSeat;
  };

  return (
    <div className="seat-selection">
      <h2>Eliga sus asientos</h2>
      <div className="seat-grid">{renderSeats()}</div>
      <div>
      {!showPaymentForm && (
        <button type="button" className="btn btn-primary" onClick={handleReserveClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-ticket-detailed-fill" viewBox="0 0 16 16">
            <path d="M0 4.5A1.5 1.5 0 0 1 1.5 3h13A1.5 1.5 0 0 1 16 4.5V6a.5.5 0 0 1-.5.5 1.5 1.5 0 0 0 0 3 .5.5 0 0 1 .5.5v1.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 11.5V10a.5.5 0 0 1 .5-.5 1.5 1.5 0 1 0 0-3A.5.5 0 0 1 0 6zm4 1a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5m0 5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5M4 8a1 1 0 0 0 1 1h6a1 1 0 1 0 0-2H5a1 1 0 0 0-1 1"/>
          </svg>
          Reservar
        </button>
      )}
      </div>


      {showPaymentForm && (
        <div className="payment-modal">
          <h3>Formulario de Pago</h3>
          <form onSubmit={handlePaymentSubmit}>
            <div>
              <label>Nombre:</label>
              <input type="text" name="name" value={paymentDetails.name} onChange={handlePaymentChange} required />
            </div>
            <div>
              <label>Número de Tarjeta:</label>
              <input type="text" name="cardNumber" value={paymentDetails.cardNumber} onChange={handlePaymentChange} required />
            </div>
            <div>
              <label>Fecha de Expiración:</label>
              <input type="text" name="expiryDate" value={paymentDetails.expiryDate} onChange={handlePaymentChange} required />
            </div>
            <div>
              <label>CVV:</label>
              <input type="text" name="cvv" value={paymentDetails.cvv} onChange={handlePaymentChange} required />
            </div>
            <div>
              <label>Total a Pagar: ${calculatePrice()}</label>
            </div>
            <button type="submit">Pagar y Reservar</button>
          </form>
        </div>
      )}
      <ConfirmationModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}

export default SeatSelection;