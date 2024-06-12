import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ReviewModal = ({ show, handleClose, handleSave, title, nickname }) => {
  const [newReview, setNewReview] = useState({ 
    movieTitle: '',
    userNickname: '',
    title: '', 
    opinion: '', 
    rating: 0,
    review_date: new Date().toISOString()});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    newReview.movieTitle=title;
    newReview.userNickname=nickname;
    handleSave(newReview);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Hacer una nueva review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={newReview.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formOpinion">
            <Form.Label>Opinión</Form.Label>
            <Form.Control
              as="textarea"
              name="opinion"
              rows={3}
              value={newReview.opinion}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formRating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              name="rating"
              value={newReview.rating}
              onChange={handleChange}
              required
              min="0"
              max="10"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Enviar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ReviewModal;