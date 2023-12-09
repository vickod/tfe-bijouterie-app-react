import React from 'react'
import { useState, useEffect, useRef } from 'react'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/utilisateursSlice'
import { setCredentials } from '../slices/authSlice'


const LoginTest = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [login] = useLoginMutation();
    const {userInfo} = useSelector((state)=> state.auth)
    const {search} = useLocation()
    const searchParams = new URLSearchParams(search);
    const redirect = searchParams.get('redirect') || '/';

    // redirect
    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    }, [userInfo, redirect, navigate])


 const loginHandler = async(e) =>{  
    e.preventDefault()
    try {
        const res = await login({email, password}).unwrap();
        dispatch(setCredentials({...res,}))
        navigate(redirect)
        window.location.reload()
    }catch(err) {
        toast.error('Échec de l\'authentification. Veuillez vérifier vos identifiants.', {
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
 

//console.log(userInfo)
  return (
    <FormContainer>
        <h1>Se connecter</h1>
        <Form>
            <Form.Group controlId='email' className='my-3'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                type='email'
                placeholder='Entrez votre email'
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                >

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='password' className='my-3'>
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                type='password'
                placeholder='Entrez votre mot de passe'
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                >

                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='mt-2' onClick={loginHandler}>Se connecter</Button>          
        </Form>

        <Row className='py-3'>
            <Col>
                Pas encore inscrit? <Link to={redirect ? `/register?redirect=${redirect}`:'/'} >S'enregistrer</Link>
            </Col>
            <Col>
                  <Link to={`/forgot`} >Mot de passe oublier ?</Link>
            </Col>
        </Row>


    </FormContainer>
  )
}

export default LoginTest