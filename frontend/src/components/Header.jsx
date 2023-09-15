import {Badge, Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import brandLogo from '../assets/logos/logoBijouterie.png'
import {LinkContainer} from 'react-router-bootstrap'
import '../assets/styles/header.css';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {useLogoutMutation} from '../slices/utilisateursSlice';
import {logout} from '../slices/authSlice';
import { effacerPanier } from "../slices/panierSlice";

const Header = () => {
  const {articlesDuPanier} = useSelector((state) => state.panier)

  const {userInfo} = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  
  const logoutHandler = async () => {
      try {
        await logoutApiCall().unwrap()
        dispatch(logout());
        dispatch(effacerPanier())
        navigate('/login');
        window.location.reload()
      }catch(err) {

      }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect >
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
                  {
                    articlesDuPanier.length > 0 && (
                      <Badge pill bg='danger' style={{marginLeft: '5px'}}>
                        {articlesDuPanier.reduce((accumulation, article) => 
                        accumulation+ article.qty, 0)}
                      </Badge>
                    )
                  }
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.prenom} id='username'>
                <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/mes_commandes">
                    <NavDropdown.Item>Mes commandes</NavDropdown.Item>
                </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>Se deconnecter</NavDropdown.Item>
                </NavDropdown> 
              ) : (
                <LinkContainer to="/login">
                <Nav.Link href='/login'>
                  <FaUser />
                  Se connecter
                </Nav.Link>
              </LinkContainer>
              )}


              {userInfo && userInfo.role === 2 && (
                <NavDropdown title='Admin' id='adminName'>
                <LinkContainer to="/admin/articles_list">
                    <NavDropdown.Item>Articles</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/utilisateurs_list">
                    <NavDropdown.Item>Utilisateurs</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/commandes_list">
                    <NavDropdown.Item>Commandes</NavDropdown.Item>
                </LinkContainer>
                </NavDropdown>
              )}
              
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header