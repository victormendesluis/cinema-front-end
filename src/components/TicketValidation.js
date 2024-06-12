import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TicketValidation=()=>{
    const [formData, setFormData] = useState({
        identifier: '',
        file: '',
      });
    const navigate = useNavigate();
    
    // Función para manejar cambios en los campos del formulario
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();

      var endpoint="";
      var body="";
      if(formData.qr_code===''){
        endpoint='bookings/validate'
        body=formData.ticket;
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          });
          const data = await response.json();
          if (response.ok) {
            console.log('DATA',data);
          } else {
            console.log('Ha ocurrido un error');
          }
        } catch (error) {
          console.error('Error al validar el ticket', error);
        }
      }else{
        endpoint='bookings/decodeQR/validate'
        const formDataToSend = new FormData();
        formDataToSend.append('file', formData.file);
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            body: formDataToSend,
          });
          const data = await response.json();
          if (response.ok) {
            console.log('DATA',data);
          } else {
            console.log('Ha ocurrido un error');
          }
        } catch (error) {
          console.error('Error al validar el ticket', error);
        }
      }
    };

    const handleBackClick = () => {
      navigate(`/`);
    };

    return (
        <div className="login-container"> {/* Aplicar la clase CSS login-container */}
          <form onSubmit={handleSubmit}>
            <div className="form-group"> {/* Aplicar la clase CSS form-group */}
              <label htmlFor="ticket">Introduce tu Código</label>
              <input
                className="form-input" // Aplicar la clase CSS form-input
                type="text"
                id="ticket"
                name="ticket"
                value={formData.ticket}
                onChange={handleChange}
              />
            </div>
            <div className="form-group"> {/* Aplicar la clase CSS form-group */}
              <label htmlFor="file">o Escanea tu QR</label>
              <input
                className="form-input" // Aplicar la clase CSS form-input
                type="file"
                id="file"
                name="file"
                value={formData.qr_code}
                onChange={handleChange}
              />
            </div>
            <button className="login-button" type="submit">Validar Ticket</button>
            <button className="btn btn-secondary mb-3" onClick={handleBackClick}>Atrás</button>
          </form>
        </div>
      );
}
export default TicketValidation;