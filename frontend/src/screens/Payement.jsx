import { useState, useEffect } from "react"
import {Form, Button, Col} from 'react-bootstrap'
import FormContainer from "../components/FormContainer"
import CheckoutSteps from "../components/CheckoutSteps"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { savePayementMethod } from "../slices/panierSlice"
import { toast } from 'react-toastify'
import logoPaypal from '../assets/logos/logoPaypal.png'

const Payement = () => {
const {userInfo} = useSelector((state)=> state.auth)
const [payementMethod, setPayementMethod] = useState('Paypal')
const dispatch = useDispatch()
const navigate = useNavigate()

useEffect(() => {
    if(!userInfo.adresse){
        navigate('/verification')
        toast.error("Veuillez choisir une adresse", {
            position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
            autoClose: 5000, // Ferme automatiquement après 5 secondes
            hideProgressBar: true, // Affiche la barre de progression
            closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
            pauseOnHover: true, // Met en pause le temps d'affichage en survolant
            draggable: true, // Permet de faire glisser le toast
            progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
        });
        
    }
}, [userInfo.adresse, navigate])


const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayementMethod(payementMethod));
    navigate('/commande')
    window.location.reload();
}

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />
            <h1>Mode de paiement</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Selectionner un mode de paiement</Form.Label>
                    <Col>
                        <Form.Check
                        type='radio'
                        className="my-2"
                        label=<img src={logoPaypal} alt="brand-logo" height="70" />
                        id='Paypal'
                        name='methodeDePayement'
                        value='Paypal'
                        checked
                        onChange={(e) => setPayementMethod(e.target.value)}
                        >
                        </Form.Check>
                        
                    </Col>
                </Form.Group>
                <br></br>
                <Button type="submit" variant="primary">
                    Continuer
                </Button>

            </Form>
        
    </FormContainer>
  )
}

export default Payement