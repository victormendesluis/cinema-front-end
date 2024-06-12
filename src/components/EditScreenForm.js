import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditScreenForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cinemas, setCinemas] = useState([]);
  const [formData, setFormData] = useState({
    cinema_id: '',
    supports: '',
    rows: '',
    numberOfSeats: ''
  });

  useEffect(() => {
    // Fetch cinemas from API
    const fetchCinemas = async () => {
      try {
        const response = await fetch('/cinemas'); // Replace with your API endpoint
        const data = await response.json();
        setCinemas(data);
      } catch (error) {
        console.error('Error fetching cinemas:', error);
      }
    };

    // Fetch screen details from API
    const fetchScreenDetails = async () => {
      try {
        const response = await fetch(`/screens/${id}`);
        if(response.ok){
            const data = await response.json();
            console.log(data);
            setFormData(data);
        }
      } catch (error) {
        console.error('Error fetching screen details:', error);
      }
    };

    fetchCinemas();
    fetchScreenDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/screens/${id}`, { // Replace with your API endpoint
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Screen updated successfully!');
        navigate('/screens'); // Redirect to the screens list page
      } else {
        console.error('Failed to update screen');
      }
    } catch (error) {
      console.error('Error updating screen:', error);
    }
  };

  const handleBackClick = () => {
    navigate('/screens'); // Redirect to the screens list page
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="cinema_id">Cine:</label>
        <select
          id="cinema_id"
          name="cinema_id"
          value={formData.cinema_id}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona un cine</option>
          {cinemas.map((cinema) => (
            <option key={cinema.id} value={cinema.id}>
              {cinema.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="supports">Supports:</label>
        <input
          type="text"
          id="supports"
          name="supports"
          value={formData.supports}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="rows">Filas:</label>
        <input
          type="number"
          id="rows"
          name="rows"
          value={formData.rows}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="numberOfSeats">Número de Asientos:</label>
        <input
          type="number"
          id="numberOfSeats"
          name="numberOfSeats"
          value={formData.numberOfSeats}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Actualizar Pantalla</button>
      <button type="button" onClick={handleBackClick}>Atrás</button>
    </form>
  );
}

export default EditScreenForm;