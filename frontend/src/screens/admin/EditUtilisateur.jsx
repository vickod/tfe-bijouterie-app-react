import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import {
  useGetUtilisateurDetailsQuery,
  useUpdateUtilisateurMutation,
} from '../../slices/utilisateursSlice';


const EditUtilisateur = () => {


    const { id: utilisateurId } = useParams();
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [adresse, setAdresse] = useState('');
  //const [role, setRole] = useState(1);
 

  const {
    data: utilisateur,
    isLoading,
    error,
    refetch,
  } = useGetUtilisateurDetailsQuery(utilisateurId);

  const [updateUtilisateur, { isLoading: loadingUpdate }] = useUpdateUtilisateurMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUtilisateur({ utilisateurId, nom, prenom, email, telephone, adresse });
      toast.success("l'utilisateur a été mis a jour");
      refetch();
      navigate('/admin/utilisateurs_list');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (utilisateur) {
      setNom(utilisateur.nom);
      setPrenom(utilisateur.prenom);
      setTelephone(utilisateur.telephone) 
      setEmail(utilisateur.email);  
      setAdresse(utilisateur.adresse);  
      //setRole(utilisateur.role);  
    }
  }, [utilisateur]);




// const handleRadioChange = (value) => {
//   setRole(value);

// };




  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
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
                type='number'
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
            
            {/* {['radio'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check
            inline
            label="Client"
            name="group1"
            type={type}
            id={`inline-${type}-1`}
            onChange={() => handleRadioChange(1)}
            checked={role === 1}
          />
          <Form.Check
            inline
            label="Admin"
            name="group1"
            type={type}
            id={`inline-${type}-2`}
            onChange={() => handleRadioChange(2)}
            checked={role === 2}
          />
          <Form.Check
            inline
            disabled
            label="3 (disabled)"
            type={type}
            id={`inline-${type}-3`}
            onChange={() => handleRadioChange(3)}
            checked={role === 3}
          />
        </div>
      ))} */}
          

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