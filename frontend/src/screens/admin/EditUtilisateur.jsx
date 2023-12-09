import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Col, Row, ButtonGroup, DropdownButton, Dropdown, } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useGetUtilisateursQuery } from '../../slices/utilisateursSlice'
import {
  useGetUtilisateurDetailsQuery,
  useUpdateUtilisateurMutation,
} from '../../slices/utilisateursSlice';


const EditUtilisateur = () => {
  const navigate = useNavigate();
  const {data: utilisateurs} = useGetUtilisateursQuery();
  const { id: utilisateurId } = useParams();
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [adresse, setAdresse] = useState('');
  const [role, setRole] = useState(1);
  const {data,isLoading,error,refetch,} = useGetUtilisateurDetailsQuery(utilisateurId);
  const [updateUtilisateur, { isLoading: loadingUpdate }] = useUpdateUtilisateurMutation();
  const [password, setPassword] = useState("")

  useEffect(() => {
    if (data && data.utilisateur) {
      setNom(data.utilisateur.nom);
      setPrenom(data.utilisateur.prenom);
      setTelephone(data.utilisateur.telephone) 
      setEmail(data.utilisateur.email);  
      setAdresse(data.utilisateur.adresse);  
      setRole(data.userRole.role);  
    }
  }, [data]);

  

  const submitHandler = async (e) => {
    e.preventDefault();
    const verifNom = /^[a-zA-Z]{2,}$/
    const verifEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    const verifAdresse = /^[a-zA-Z\s-']+ \d{1,5}, \d{4} [a-zA-Z]+$/;
     //const verifPassword = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&-_\s]{6,}$/

    const ifExistEmail = utilisateurs && utilisateurs.find(user => user.email === email)
    const emailUser = data && data.utilisateur.email
    const verifTel = /^\+?\d{1,3}\d{1,11}$/
    if(!nom || !prenom || !adresse || !email) {
      toast.error('Veuillez remplir les champs', {
        position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
        autoClose: 5000, // Ferme automatiquement après 5 secondes
        hideProgressBar: true, // Affiche la barre de progression
        closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
        pauseOnHover: true, // Met en pause le temps d'affichage en survolant
        draggable: true, // Permet de faire glisser le toast
        progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
    });
    }
    else if(ifExistEmail && emailUser !== ifExistEmail.email) {
      toast.error('cet email est deja attribué', {
        position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
        autoClose: 5000, // Ferme automatiquement après 5 secondes
        hideProgressBar: true, // Affiche la barre de progression
        closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
        pauseOnHover: true, // Met en pause le temps d'affichage en survolant
        draggable: true, // Permet de faire glisser le toast
        progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
    });
    }
    else if (!verifAdresse.test(adresse)) {
      toast.error("Vous devez respecter le format de l'adresse (rue + numero, cp Ville) ", {
        position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
        autoClose: 5000, // Ferme automatiquement après 5 secondes
        hideProgressBar: true, // Affiche la barre de progression
        closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
        pauseOnHover: true, // Met en pause le temps d'affichage en survolant
        draggable: true, // Permet de faire glisser le toast
        progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
    });
    }
    else if (telephone && !verifTel.test(telephone)) {
      toast.error("Veuillez ajouter un numero gsm valide ", {
        position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
        autoClose: 5000, // Ferme automatiquement après 5 secondes
        hideProgressBar: true, // Affiche la barre de progression
        closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
        pauseOnHover: true, // Met en pause le temps d'affichage en survolant
        draggable: true, // Permet de faire glisser le toast
        progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
    });
    }
    else if (password && password.length < 6) {
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
     else {
      try {
        await updateUtilisateur({ utilisateurId, nom, prenom, email, telephone, adresse, role, password });
        //toast.success("l'utilisateur a été mis a jour");
        //refetch();
        navigate('/admin/utilisateurs_list');
        window.location.reload()
      } catch (err) {
        toast.error(err?.data?.message || err.message, {
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


console.log(password)
//console.log(data ? data.utilisateur :"")


//console.log(role)



  return (
    <>
      <Link to='/admin/utilisateurs_list' className='btn btn-light my-3'>
        Retour
      </Link>
      <FormContainer>
        <h1>Mettre a jour l'utilisateur</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className='my-2' controlId='name'>
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type='text'
                placeholder='nom'
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='prenom'>
              <Form.Label>Prenom</Form.Label>
              <Form.Control
                type='text'
                placeholder='prenom'
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='telephone'>
              <Form.Label>telephone</Form.Label>
              <Form.Control
                type='text'
                placeholder='telephone'
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              ></Form.Control>
            </Form.Group>
            
            <Form.Group className='my-2' controlId='adresse'>
              <Form.Label>Adresse</Form.Label>
              <Form.Control
                type='adresse'
                placeholder='adresse'
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {data.utilisateur.roleId === 2 && (
              <Form.Group controlId="password" className="my-3">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              >
              </Form.Control>
              </Form.Group>
            )}
            


            <Form.Group controlId="role">
                  {data.utilisateur.roleId !== 2 && (
                    <>
                    <Form.Label>Role</Form.Label>
                    <Row>    

                      <Col>
                        <Form.Control
                          type="text"
                          placeholder="choisissez le role"
                          value={role}
                          disabled
                        />
                      </Col>
                      <Col>
                        <Form.Select
                          aria-label=""
                          onChange={(e) => setRole(e.target.value)}
                        >
                         <option defaultValue="client"></option>
                          <option defaultValue="client">client</option>
                          <option defaultValue="client">livreur</option>
                        </Form.Select>
                      </Col>
                    </Row>
                    </>
                  )}
                    
                  </Form.Group>
                  <br></br>
          

            <Button type='submit' variant='primary'>
              Mettre a jour
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default EditUtilisateur