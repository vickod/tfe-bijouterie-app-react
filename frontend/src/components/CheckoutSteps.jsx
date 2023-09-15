import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


const CheckoutSteps = ({step1, step2, step3, step4}) => {




  return (
    <Nav className='justify-content-center mb-4'>
        <Nav.Item>
            {step1 ? (
                <LinkContainer to='/'>
                    <Nav.Link>Vers la boutique</Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled>Vers la boutique</Nav.Link>
            )}
            
        </Nav.Item>

        <Nav.Item>
            {step2 ? (
                <LinkContainer to='/verification'>
                    <Nav.Link>Adresse</Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled>Adresse</Nav.Link>
            )}
            
        </Nav.Item>

        <Nav.Item>
            {step3 ? (
                <LinkContainer to='/payement'>
                    <Nav.Link>Mode de Paiement</Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled>Payement</Nav.Link>
            )}
            
        </Nav.Item>

        <Nav.Item>
            {step4 ? (
                <LinkContainer to='/commande'>
                    <Nav.Link>Validation</Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled>Commande</Nav.Link>
            )}
            
        </Nav.Item>

    </Nav>
  )
}

export default CheckoutSteps