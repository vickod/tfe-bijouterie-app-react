import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useResetPasswordMutation } from '../slices/utilisateursSlice';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Row } from 'react-bootstrap';
import axios from 'axios'
import {toast} from 'react-toastify'
import Message from '../components/Message';
import Loader from '../components/Loader';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [resetPassword, {isLoading}] = useResetPasswordMutation();
  

  const envoyerEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/forgot', {email: email} );
      toast.success('Email envoyé', {
        position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
        autoClose: 5000, // Ferme automatiquement après 5 secondes
        hideProgressBar: true, // Affiche la barre de progression
        closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
        pauseOnHover: true, // Met en pause le temps d'affichage en survolant
        draggable: true, // Permet de faire glisser le toast
        progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
    });
    } catch (err) {
      toast.error('Email inexistant', {
        position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
        autoClose: 5000, // Ferme automatiquement après 5 secondes
        hideProgressBar: true, // Affiche la barre de progression
        closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
        pauseOnHover: true, // Met en pause le temps d'affichage en survolant
        draggable: true, // Permet de faire glisser le toast
        progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
    });
    }
  };

  return (
    <Row>
    <h1>Recuperation du compte</h1>
    <Col lg={5} xl={5}>

    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control 
        type="email" 
        placeholder="Email" 
        value={email}
        onChange={(e)=> setEmail(e.target.value)}  
        />   
      </Form.Group>
      <Button variant="primary" type="submit" onClick={envoyerEmail}>
        Envoyer
      </Button>
    </Form>
    </Col>
    {isLoading && <Loader />}
    </Row>
    
  )
}
export default ForgotPassword

