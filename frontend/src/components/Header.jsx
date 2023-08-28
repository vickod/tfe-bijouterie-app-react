import {Navbar, Nav, Container,DropdownButton, Dropdown, Row, Col} from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import brandLogo from '../assets/logos/logoBijouterie.png'
import {LinkContainer} from 'react-router-bootstrap'
//import { useState } from 'react';
import '../assets/styles/header.css';
import { Link } from "react-router-dom";
//import {useSelector} from 'react-redux';

const Header = () => {

  

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={brandLogo} alt="brand-logo" height="30" />
              V.BIJOUTERIE
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/panier">
                <Nav.Link>
                  <FaShoppingCart /> Panier
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaUser />
                  Sign in
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* BOUTIQUE BUTTON */}
     
     {/* <div className='button-slide'>
     <Container>
     <Row> 
        <Col>
     <DropdownButton id="dropdown-basic-button" className='boutique-button' title="Boutique">
      <Dropdown.Item href="#/action-1" className='dropdown-menu-center'>

      <div className="container-slide">
        <div className="woman">
          <div>
            <img
              className="image-slide"
              src="/img/pexels-pixabay-458766.jpg"
              alt="woman"
              width="300"
            />
          </div>
          <div className="woman-categories">
            <h1>Femme</h1>
            <div>
            <Link to="/femme/bagues"><h3>Bagues</h3> </Link>
              <h3>Boucles d'oreilles</h3>
              <h3>Colliers et Chaines</h3>
            </div>
          </div>
        </div>
        <div className="man">
          <div>
            <img
              className="image-slide"
              src="/img/man.jpg"
              alt="man"
              width="300"
            />
          </div>
          <div className="man-categories">
            <h1>Homme</h1>
            <div>
              <h3>Bagues</h3>
              <h3>Chaines</h3>
            </div>
          </div>
        </div>
      </div>
      
      </Dropdown.Item>
      </DropdownButton>
      </Col>
      </ Row>
      </Container>
     </div> */}
      

   

      



    </header>
  );
}

export default Header