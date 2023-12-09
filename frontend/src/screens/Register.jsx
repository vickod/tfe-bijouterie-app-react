import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';

import { useRegisterMutation } from '../slices/utilisateursSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
//import './index.css';

const Register = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [rue, setRue] = useState('');
    const [cp, setCp] = useState('');
    const [ville, setVille] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    const navigate = useNavigate()
    

    const [register, {isLoading}] = useRegisterMutation();
    const { userInfo } = useSelector((state) => state.auth);
    const {search} = useLocation()
    const searchParams = new URLSearchParams(search);
    const redirect = searchParams.get('redirect') || '/';
    //const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
    // redirect
    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    }, [userInfo, redirect, navigate])


 const registerHandler = async(e) =>{  
    e.preventDefault()
      let adresse; 
      const verifNom = /^[a-zA-Z]{2,}$/
      const verifEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
      const verifRue = /^[a-zA-Z\s]+ \d+[a-zA-Z]?$/;
      const verifCp = /^\d{2,}$/
      //const verifPassword = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&-_\s]{6,}$/
      if(!nom || !prenom || !email || !rue || !cp || !ville || !password) {
        toast.error("Veuillez remplir tous les champs", {
          position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
          autoClose: 5000, // Ferme automatiquement après 5 secondes
          hideProgressBar: true, // Affiche la barre de progression
          closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
          pauseOnHover: true, // Met en pause le temps d'affichage en survolant
          draggable: true, // Permet de faire glisser le toast
          progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
      });
      }else if (!verifNom.test(nom) || !verifNom.test(prenom) || ville.length < 2 || rue.length < 3 || !verifCp.test(cp) ) {
        toast.error("Vos données doivent être valides", {
          position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
          autoClose: 5000, // Ferme automatiquement après 5 secondes
          hideProgressBar: true, // Affiche la barre de progression
          closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
          pauseOnHover: true, // Met en pause le temps d'affichage en survolant
          draggable: true, // Permet de faire glisser le toast
          progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
      });
      }
      else if (!verifRue.test(rue)) {
        toast.error("Vous devez respecter le format (rue + numero) ", {
          position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
          autoClose: 5000, // Ferme automatiquement après 5 secondes
          hideProgressBar: true, // Affiche la barre de progression
          closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
          pauseOnHover: true, // Met en pause le temps d'affichage en survolant
          draggable: true, // Permet de faire glisser le toast
          progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
      });
      }
      else if (!verifEmail.test(email)) {
        toast.error("Veuillez utiliser un e-mail valide ", {
          position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
          autoClose: 5000, // Ferme automatiquement après 5 secondes
          hideProgressBar: true, // Affiche la barre de progression
          closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
          pauseOnHover: true, // Met en pause le temps d'affichage en survolant
          draggable: true, // Permet de faire glisser le toast
          progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
      });
      }
      else if (password.length < 6) {
        toast.error("Le mot de passe doit etre d'au moins 6 caracteres", {
          position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
          autoClose: 5000, // Ferme automatiquement après 5 secondes
          hideProgressBar: true, // Affiche la barre de progression
          closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
          pauseOnHover: true, // Met en pause le temps d'affichage en survolant
          draggable: true, // Permet de faire glisser le toast
          progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
      });
      }
      else {

        try {
          adresse = rue && cp && ville ? `${rue.replace(/\s+/g, ' ').charAt(0).toUpperCase()+rue.slice(1).toLowerCase()}, ${cp} ${ville.replace(/\s+/g, ' ').charAt(0).toUpperCase() + ville.slice(1).toLowerCase()}` : "";
          const res = await register({ 
            nom: nom.charAt(0).toUpperCase() + nom.slice(1).toLowerCase(), 
            prenom: prenom.charAt(0).toUpperCase() + prenom.slice(1).toLowerCase(), 
            adresse, 
            email: email.toLowerCase(), 
            password }).unwrap();
          //dispatch(setCredentials({ ...res }));
          //navigate(redirect);
          navigate('/login');
          //window.location.reload()
          toast.success("vous avez été enregistré !", {
            position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
            autoClose: 5000, // Ferme automatiquement après 5 secondes
            hideProgressBar: true, // Affiche la barre de progression
            closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
            pauseOnHover: true, // Met en pause le temps d'affichage en survolant
            draggable: true, // Permet de faire glisser le toast
            progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
        });
        }catch(err) {
            toast.error(err?.data?.message || err.error, {
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

      

  }
    
      
 
 

//console.log(userInfo)
  return (
    <FormContainer>
      <h1>S'enregistrer</h1>
      <Form>
      <Row className="mb-3">
        <Form.Group as={Col}  controlId="nom">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}   
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="prenom">
          <Form.Label>Prenom</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Prenom"
            value={prenom}
            onChange={(e)=> setPrenom(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>

     

    




        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>




        <Row className="mb-3">
        <Form.Group  className="my-3 col-5" controlId="rue">
          <Form.Label>Adresse</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="Rue + n°" 
          required 
          value={rue}
          onChange={(e) => setRue(e.target.value)} 
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} className="my-3 col-3" controlId="validationCustom05">
          <Form.Label>CP</Form.Label>
          <Form.Control 
          type="number" 
          placeholder="Code Postal" 
          required 
          value={cp}
          onChange={(e) => setCp(e.target.value)} 
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} className="my-3" controlId="validationCustom03">
          <Form.Label>Ville</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="Ville" 
          required 
          value={ville}
          onChange={(e) => setVille(e.target.value)} 
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>






        <Form.Group controlId="password" className="my-3">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Choisisez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          onClick={registerHandler}
        >
          S'enregistrer
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Deja client? {" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Se connecter
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default Register