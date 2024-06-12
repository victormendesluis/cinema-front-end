import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';

const ReviewsList = ({id}) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const response = await fetch(`/movie/${id}/reviews`);
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        } else {
          console.error('Error al obtener las funciones.');
        }
      } catch (error) {
        console.error('Error al obtener las funciones:', error);
      }
    };

    fetchAllReviews();
    setLoading(false);
  }, []);

  return (
    <div>
      {loading ? (
        <div>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      ) : (
      <div>
        <h1>Reviews</h1>
        {reviews.map(review=>(
            <div>
                <h2>{review.userNickname}</h2>
                <p>{review.title}</p>
                <textarea value={review.opinion}/>
                <p>{review.review_date}</p>
            </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default ReviewsList;