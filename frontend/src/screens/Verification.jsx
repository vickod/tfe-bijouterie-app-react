//import { useState } from "react"
import {Form, Button, Card} from 'react-bootstrap'
import FormContainer from "../components/FormContainer"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
//import { saveShippingAdresse } from "../slices/panierSlice"
import CheckoutSteps from "../components/CheckoutSteps"
import { Link } from "react-router-dom";

const Verification = () => {
  const {userInfo} = useSelector((state)=> state.auth)
  //const dispatch = useDispatch()
  const navigate = useNavigate()



  const submitHandler = (e) => {
    e.preventDefault();
    navigate('/payement')
    window.location.reload()
  }


  return (
    <FormContainer>

    <CheckoutSteps step1 step2 />

    <h1>Vérification</h1>
    <Form onSubmit={submitHandler}>

    {userInfo ? (
      <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>mon adresse de livraison est il correcte?</Card.Title>
        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
        <Card.Text>
        <br></br>
          {userInfo.adresse}
          <br></br>
        </Card.Text>
        {/* <Card.Link href="#">Card Link</Card.Link> */}
        <Link to="/profile">Modifier mon adresse</Link>
      </Card.Body>
    </Card>
          
          ) : ""}
    
       
        {/* <Form.Group controlId='adresse' className="my-2">
            <Form.Label > Adresse </Form.Label><br/>
            <Form.Control
            type ='text'  
            placeholder= 'mettez votre adresse' 
            value={adresse} 
            onChange={(e) =>{setAdresse(e.target.value)}}>
            </Form.Control>  
        </Form.Group>

        <Form.Group controlId='ville' className="my-2">
            <Form.Label > Ville </Form.Label><br/>
            <Form.Control
            type ='text'  
            placeholder= 'mettez votre ville' 
            value={ville} 
            onChange={(e) =>{setVille(e.target.value)}}>
            </Form.Control>  
        </Form.Group>

        <Form.Group controlId='cp' className="my-2">
            <Form.Label > Cp </Form.Label><br/>
            <Form.Control
            type ='text'  
            placeholder= 'mettez votre Cp' 
            value={cp} 
            onChange={(e) =>{setCp(e.target.value)}}>
            </Form.Control>  
        </Form.Group> */}

        <Button type="submit" variant='primary' className='my-2'>
            Continuer
        </Button>
      
    </Form>
    </FormContainer>
  )
}
export default Verification