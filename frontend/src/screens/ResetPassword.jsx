import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import {toast} from 'react-toastify'


const ResetPassword = () => {
  const {token } = useParams();
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!password || password.length < 6) {
      toast.error('votre nouveau mot de passe doit contenir min 6 caracteres', {
        position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
        autoClose: 5000, // Ferme automatiquement après 5 secondes
        hideProgressBar: true, // Affiche la barre de progression
        closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
        pauseOnHover: true, // Met en pause le temps d'affichage en survolant
        draggable: true, // Permet de faire glisser le toast
        progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
    });
    }else {
      try {
      
        const response = await axios.put(`/api/forgot/${token}`, {
          password,
        });
        toast.success('Mot de passe modifié', {
          position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
          autoClose: 5000, // Ferme automatiquement après 5 secondes
          hideProgressBar: true, // Affiche la barre de progression
          closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
          pauseOnHover: true, // Met en pause le temps d'affichage en survolant
          draggable: true, // Permet de faire glisser le toast
          progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
      });
        //window.location.reload()
        navigate('/login');
      } catch (error) {
        toast.error('impossible a modifier', {
          position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
          autoClose: 5000, // Ferme automatiquement après 5 secondes
          hideProgressBar: true, // Affiche la barre de progression
          closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
          pauseOnHover: true, // Met en pause le temps d'affichage en survolant
          draggable: true, // Permet de faire glisser le toast
          progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
      });
      }
    }
    
  };

  return (
    <>
      
      <Row>
      <h1>Réinitialiser le mot de passe</h1>
    <Col lg={5} xl={5}>

    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        type="password" 
        placeholder="Nouveau mot de passe" 
        value={password}
        onChange={(e)=> setPassword(e.target.value)}  
        />   
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleResetPassword}>
        Envoyer
      </Button>
    </Form>
    </Col>
    
    </Row>
    </>
  );
};

export default ResetPassword;
