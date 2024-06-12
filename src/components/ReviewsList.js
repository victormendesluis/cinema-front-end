import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import ReviewModal from './ReviewModal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ReviewsList = ({movie}) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [user, setUser]=useState({
    name: '',
    surname: '',
    email: '',
    phone:'',
    nickname:'',
    password: ''
  });

  useEffect(() => {
    fetchAllReviews();
    fetchUserDetails();
    handleShowButton();
    setLoading(false);
  }, []);

  const fetchAllReviews = async () => {
    try {
      const response = await fetch(`/movie/${movie.id}/reviews`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      } else {
        console.error('Error al obtener las reviews.');
      }
    } catch (error) {
      console.error('Error al obtener las reviews:', error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`/users/${localStorage.getItem('token')}`);
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    } catch (error) {
      console.log(error)
    }
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleShowButton=async ()=>{
    try{
      var userId=localStorage.getItem('token');
      const response = await fetch(`/user/${userId}/movie/${movie.id}/tickets`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        if(data>0){
          setShowButton(true);
        }
      } else {
        console.error('');
      }
    }catch(error){
      console.error('', error);
    }
  }

  const handleSubmit = async (newReview) => {
    try {
      const response = await fetch(`/movie/${movie.id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });
      if (response.ok) {
        const savedReview = await response.json();
        fetchAllReviews();
      } else {
        console.error('Error al guardar la review.');
      }
    } catch (error) {
      console.error('Error al guardar la review:', error);
    }
  };

  return (
    <Container>
      {loading ? (
        <div>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      ) : (
        <div>
          <h1>Reviews</h1>
          {reviews.map((review, index) => (
            <div key={index} className="mb-4">
              <Row className="align-items-center">
                <Col>
                  <h2>{review.title}</h2>
                </Col>
                <Col className="text-end">
                  <h5>Autor: {review.userNickname}</h5>
                </Col>
              </Row>
              <textarea value={review.opinion} disabled/>
              <p>Rating: {review.rating}</p>
              <p>{new Date(review.review_date).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
      {showButton&&<Button variant="primary" onClick={handleShow}>Hacer review</Button>}
      <ReviewModal show={showModal} handleClose={handleClose} handleSave={handleSubmit} title={movie.title} nickname={user.nickname}/>
    </Container>
  );
};

export default ReviewsList;