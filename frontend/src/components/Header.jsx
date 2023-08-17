import {Navbar, Nav, Container} from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import brandLogo from '../assets/logos/logoBijouterie.png'
import {LinkContainer} from 'react-router-bootstrap'
const Header = () => {
  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>
                    <img src={brandLogo} alt="brand-logo"></img>
                    V.BIJOUTERIE
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav"> 
                    <Nav className="ms-auto">
                        <LinkContainer to="/cart">
                            <Nav.Link><FaShoppingCart/> Panier</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/login">
                            <Nav.Link><FaUser/>Sign in</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header