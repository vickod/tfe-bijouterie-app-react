import { useState, useEffect } from "react"
import {Table, Form, Button, Row, Col,} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import {toast} from 'react-toastify';
import Message from "../components/Message";
import Loader from "../components/Loader";
import {useProfileMutation} from "../slices/utilisateursSlice";
import {setCredentials} from "../slices/authSlice";
import { useGetMesCommandesQuery } from "../slices/commandesApiSlice";
import {FaTimes} from 'react-icons/fa'

const Profile = () => {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [password, setPassword] = useState("");
    const [adresse, setAdresse] = useState("");
    const [rue, setRue] = useState("");
    const [cp, setCp] = useState("");
    const [ville, setVille] = useState("");
    const [role, setRole] = useState(1);

    const dispatch = useDispatch();
    const {userInfo} = useSelector((state) => state.auth);
    const [majProfile, {isLoading: loadingMajProfile}] = useProfileMutation();
    // const {data: commandes, isLoading, error} = useGetMesCommandesQuery();


    useEffect(()=> {
      if (userInfo) {
        if (userInfo.nom) {
            setNom(userInfo.nom);
        }
        if (userInfo.prenom) {
            setPrenom(userInfo.prenom);
        }
        if (userInfo.email) {
            setEmail(userInfo.email);
        }
        if (userInfo.telephone) {
            setTelephone(userInfo.telephone);
        }
        if (userInfo.adresse) {
            setAdresse(userInfo.adresse);
        }
        if (userInfo.role) {
          setRole(userInfo.role);
      }
    }
    }, [userInfo])

    const submitHandlerProfile = async (e) => {
        e.preventDefault();
        const verifNom = /^[a-zA-Z]{2,}$/
        const verifEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
        const verifTel = /^\+?\d{1,3}\d{1,11}$/

        //const verifPassword = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&-_\s]{6,}$/
        try {
          if (nom && !verifNom.test(nom) ) {
            toast.error("Veuillez utiliser un nom valide", {
              position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
              autoClose: 5000, // Ferme automatiquement après 5 secondes
              hideProgressBar: true, // Affiche la barre de progression
              closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
              pauseOnHover: true, // Met en pause le temps d'affichage en survolant
              draggable: true, // Permet de faire glisser le toast
              progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
          });
          }
          else if (prenom && !verifNom.test(prenom)) {
            toast.error("Veuillez utiliser un prenom valide ", {
              position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
              autoClose: 5000, // Ferme automatiquement après 5 secondes
              hideProgressBar: true, // Affiche la barre de progression
              closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
              pauseOnHover: true, // Met en pause le temps d'affichage en survolant
              draggable: true, // Permet de faire glisser le toast
              progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
          });
          }
          else if (email && !verifEmail.test(email)) {
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
          else if (telephone && !verifTel.test(telephone)) {
            toast.error("Veuillez utiliser un numero de telephone valide ", {
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
          }else {
            const res = await majProfile({utilisateurId: userInfo.id, 
              nom: nom.charAt(0).toUpperCase()+nom.slice(1).toLowerCase(), 
              prenom: prenom.charAt(0).toUpperCase()+prenom.slice(1).toLowerCase(),
              email: email.toLowerCase(), 
              telephone, 
              password}).unwrap();
              dispatch(setCredentials(res));
              //localStorage.setItem('userInfo', JSON.stringify(res))
              toast.success('Profile mis a jour avec succes',{
                position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
                autoClose: 5000, // Ferme automatiquement après 5 secondes
                hideProgressBar: true, // Affiche la barre de progression
                closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
                pauseOnHover: true, // Met en pause le temps d'affichage en survolant
                draggable: true, // Permet de faire glisser le toast
                progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
            })
          }
            

        }catch(err) {
            toast.error(err?.data?.message || err.error,{
              position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
              autoClose: 5000, // Ferme automatiquement après 5 secondes
              hideProgressBar: true, // Affiche la barre de progression
              closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
              pauseOnHover: true, // Met en pause le temps d'affichage en survolant
              draggable: true, // Permet de faire glisser le toast
              progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
          })
        }
    }


    const submitHandlerAdresse = async (e) => {
      e.preventDefault();

      let nouvelleAdresse; 
      const verifRue = /^[a-zA-Z\s]+ \d+[a-zA-Z]?$/;
      const verifCp = /^\d{2,}$/
      
      if(!rue || !cp || !ville) {
        toast.error("Veuillez remplir tous les champs de l'adresse", {
          position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
          autoClose: 5000, // Ferme automatiquement après 5 secondes
          hideProgressBar: true, // Affiche la barre de progression
          closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
          pauseOnHover: true, // Met en pause le temps d'affichage en survolant
          draggable: true, // Permet de faire glisser le toast
          progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
      });
      }else if (ville.length < 2 || rue.length < 3 || !verifCp.test(cp) ) {
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
      else {
        try {
          nouvelleAdresse = rue && cp && ville ? `
          ${rue.replace(/\s+/g, ' ').charAt(0).toUpperCase()+rue.slice(1).toLowerCase()}, ${cp} ${ville.replace(/\s+/g, ' ').charAt(0).toUpperCase()+ville.slice(1).toLowerCase()}` : "";
          const res = await majProfile({utilisateurId: userInfo.id, 
            nom:"",
            prenom:"",
            telephone:"",
            email: "",
            password:"",
            adresse: nouvelleAdresse.trim()}).unwrap();
              dispatch(setCredentials(res));
              //localStorage.setItem('userInfo', JSON.stringify(res))
              toast.success('Adresse mis a jour avec succes', {
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
          })
        }
      }
  }

  // const handlerChangeAdresse = () => {
    
  // }

  return (
    <>
    <Row className="justify-content-center">
        <Col md={3}>

        <h3>Mon Profile</h3>

        <Form onSubmit={submitHandlerProfile}>
          <Form.Group controlId="nom" className="my-2">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="name"
              placeholder="entrez le nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="prenom" className="my-2">
            <Form.Label>prenom</Form.Label>
            <Form.Control
              type="name"
              placeholder="entrez le prenom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="email" className="my-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="entrez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="telephone" className="my-2">
            <Form.Label>Telephone</Form.Label>
            <Form.Control
              type="text"
              placeholder="n° telephone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password" className="my-2">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="my-2">
            Mettre a jour mon profile
          </Button>
          {loadingMajProfile && <Loader />}
        </Form>
      </Col>

      <Col md={3}>
        <h3>Adresse de livraison</h3>

        <Form onSubmit={submitHandlerAdresse}>
          <Form.Group controlId="adresse" className="my-2">
            <Form.Label>Mon adresse actuel:</Form.Label>
            <Form.Control
              type="text"
              placeholder="adresse"
              value={adresse}
              //onChange={(e)=>setAdresse(e.target.value)}
              disabled
            />
          </Form.Group>

          <Form.Group controlId="rue" className="my-2">
            <Form.Label>Rue:</Form.Label>
            <Form.Control
              type="text"
              placeholder="rue + n°"
              value={rue}
              onChange={(e) => setRue(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="Code postale" className="my-2">
            <Form.Label>Code postale:</Form.Label>
            <Form.Control
              type="number"
              placeholder="code postale"
              value={cp}
              onChange={(e) => setCp(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="ville" className="my-2">
            <Form.Label>Ville:</Form.Label>
            <Form.Control
              type="text"
              placeholder="ville"
              value={ville}
              onChange={(e) => setVille(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="my-2">
            Mettre a jour mon adresse
          </Button>
          {/* {loadingMajProfile && <Loader />} */}
        </Form>
        </Col>



    </Row>
    </>
  );
}
export default Profile