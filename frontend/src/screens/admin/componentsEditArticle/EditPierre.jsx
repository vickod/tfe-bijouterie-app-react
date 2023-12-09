import React, { useState } from 'react'
import {Form, Button, ButtonGroup, DropdownButton, Dropdown, Col, Modal, Row} from 'react-bootstrap'
import { toast } from 'react-toastify';
import {useModifPierreMutation, useSuppressionPierreMutation} from '../../../slices/articlesApiSlice'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {useGetDetailArticleQuery} from '../../../slices/DetailArticleSlice'

const EditPierre = ({articleId}) => {
const navigate = useNavigate();
//data & routes
//const {id: articleId} = useParams();
const {data, isLoading, refetch, error } = useGetDetailArticleQuery(articleId)
const [modifPierre] = useModifPierreMutation();
const [suppressionPierre] = useSuppressionPierreMutation();
// modal
const values = ['md-down'];
const [fullscreenPierres, setFullscreenPierres] = useState(true);
const [showPierres, setShowPierres] = useState(false);

//ARTICLES AVEC PIERRES
const [typeDePierre, setTypeDePierre] = useState("");
const [nbPierres, setNbPierres] = useState(0);
const [couleurPierre, setCouleurPierre] = useState(0);
const [nbCtPierres, setNbCtPierres] = useState(0);
const [supprimerPierre, setSupprimerPierre] = useState("");


const  ajoutPierresHandler = async(e) => {
    e.preventDefault();
    const updatedArticlePierre = {
        id: articleId,
        typeDePierre,
        nbPierres,
        couleurPierre,
        nbCtPierres
    }
    const ifExist =  data && data?.articlesAvecPierre.find((item) => item.articleId === data.article.id && item.typeDePierreId === data.pierres.find(pierre => pierre.nom === typeDePierre)?.id) 
    console.log(ifExist)
    if(typeDePierre === "" || typeDePierre === 0) {
      toast.error("Vous devez selectionner une pierre", {
        position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
        autoClose: 5000, // Ferme automatiquement après 5 secondes
        hideProgressBar: true, // Affiche la barre de progression
        closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
        pauseOnHover: true, // Met en pause le temps d'affichage en survolant
        draggable: true, // Permet de faire glisser le toast
        progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
    });
    }
    else if (nbPierres === "" || nbPierres <= 0) {
      toast.error("Vous devez definir le nombre de pierres", {
        position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
        autoClose: 5000, // Ferme automatiquement après 5 secondes
        hideProgressBar: true, // Affiche la barre de progression
        closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
        pauseOnHover: true, // Met en pause le temps d'affichage en survolant
        draggable: true, // Permet de faire glisser le toast
        progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
    });
    }
    else if (couleurPierre === "" || couleurPierre === 0) {
      toast.error("Vous devez selectionner une couleur", {
        position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
        autoClose: 5000, // Ferme automatiquement après 5 secondes
        hideProgressBar: true, // Affiche la barre de progression
        closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
        pauseOnHover: true, // Met en pause le temps d'affichage en survolant
        draggable: true, // Permet de faire glisser le toast
        progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
    });
    }
    else if (typeof(nbCtPierres) === isNaN) {
      toast.error("Vous devez definir le nombre de carats en format numerique", {
        position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
        autoClose: 5000, // Ferme automatiquement après 5 secondes
        hideProgressBar: true, // Affiche la barre de progression
        closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
        pauseOnHover: true, // Met en pause le temps d'affichage en survolant
        draggable: true, // Permet de faire glisser le toast
        progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
    });
    }
    else if (ifExist) {
      toast.error("Cette pierre est deja associé!", {
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
      const result = await modifPierre(updatedArticlePierre);
    if(result.error) {
        toast.error(result.error, {
            position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
            autoClose: 5000, // Ferme automatiquement après 5 secondes
            hideProgressBar: true, // Affiche la barre de progression
            closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
            pauseOnHover: true, // Met en pause le temps d'affichage en survolant
            draggable: true, // Permet de faire glisser le toast
            progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
        });
        console.log("erreur")
    }else {
        toast.success("l'article a été mis a jour ", {
            position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
            autoClose: 5000, // Ferme automatiquement après 5 secondes
            hideProgressBar: true, // Affiche la barre de progression
            closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
            pauseOnHover: true, // Met en pause le temps d'affichage en survolant
            draggable: true, // Permet de faire glisser le toast
            progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
        });
        //navigate('/admin/articles_list')
        window.location.reload()
    }
    }
    
  }

const deletePierre = async (e) => {
e.preventDefault();
const deletePierreArticle = {
    id: articleId,
    supprimerPierre, 
}
if(supprimerPierre === "" || supprimerPierre.length === 0 || supprimerPierre === 0) {
    toast.error('Veuillez selectionner une pierre', {
    position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
    autoClose: 5000, // Ferme automatiquement après 5 secondes
    hideProgressBar: true, // Affiche la barre de progression
    closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
    pauseOnHover: true, // Met en pause le temps d'affichage en survolant
    draggable: true, // Permet de faire glisser le toast
    progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
})
}else {
    const result = await suppressionPierre(deletePierreArticle);
if(result.error) {
    toast.error(result.error, {
        position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
        autoClose: 5000, // Ferme automatiquement après 5 secondes
        hideProgressBar: true, // Affiche la barre de progression
        closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
        pauseOnHover: true, // Met en pause le temps d'affichage en survolant
        draggable: true, // Permet de faire glisser le toast
        progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
    });
    console.log("erreur")
}else {
    toast.success("l'article a été mis a jour ", {
        position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
        autoClose: 5000, // Ferme automatiquement après 5 secondes
        hideProgressBar: true, // Affiche la barre de progression
        closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
        pauseOnHover: true, // Met en pause le temps d'affichage en survolant
        draggable: true, // Permet de faire glisser le toast
        progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
    });
    //navigate('/admin/articles_list')
    window.location.reload()
}
}

}

function handleShowPierres(breakpoint) {
    setFullscreenPierres(breakpoint);
    setShowPierres(true);
}


  return (
     <>
      {values.map((v, idx) => (
        <Button key={idx} className="me-2 mb-2" onClick={() => handleShowPierres(v)}>
          Ajouter/Supprimer
          {typeof v === 'string' && ` Pierre`}
        </Button>
      ))}
      <Modal show={showPierres} fullscreen={fullscreenPierres} onHide={() => setShowPierres(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter/Modifier Pierres</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Col className="col-12">
                <Form onSubmit={ajoutPierresHandler}>
                <Form.Group controlId="pierre">
                    <Form.Label>Type de pierre</Form.Label>
                    <Row>    
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder="choisissez un type de pierre"
                          value={typeDePierre}
                          disabled
                        />
                      </Col>
                      <Col>
                        <Form.Select
                          aria-label=""
                          onChange={(e) => setTypeDePierre(e.target.value)}
                        >
                          <option defaultValue=""></option>
                          {data && data.pierres.map((pierre) => (
                            <option value={pierre.nom} key={pierre.id}>
                              {pierre.nom}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                  </Form.Group>

                  <Form.Group controlId="nbPierres">
                    <Form.Label>Nombre de pierres</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="nombre de pierres"
                      value={nbPierres}
                      onChange={(e) => setNbPierres(e.target.value)}
                      min="0"
                    />   
                  </Form.Group>

                  <Form.Group controlId="couleur">
                    <Form.Label>Couleur pierre</Form.Label>
                    <Row>    
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder="choisissez une couleur"
                          value={couleurPierre}
                          disabled
                        />
                      </Col>
                      <Col>
                        <Form.Select
                          aria-label=""
                          onChange={(e) => setCouleurPierre(e.target.value)}
                        >
                          <option defaultValue=""></option>
                          {data && data.couleurs.map((couleur) => (
                            <option value={couleur.nom} key={couleur.id}>
                              {couleur.nom}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                  </Form.Group>

                  <Form.Group controlId="nombres de carats">
                    <Form.Label>Nombre de carats</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="nombre de carats"
                      value={nbCtPierres}
                      onChange={(e) => setNbCtPierres(e.target.value)}
                    />   
                  </Form.Group>
                  <br></br>
                  <Button type="submit" variant="primary" className="my-2">
                   Ajouter cette pierre
                  </Button>
                </Form>
        </Col>

        <Form onSubmit={deletePierre}>
                    <Row>
                      <Col>
                      <br></br>
                      <h3 style={{color: 'red'}}>Supprimer une pierre</h3>
                        <Form.Select
                          aria-label=""
                          onChange={(e) => {
                            setSupprimerPierre(e.target.value);
                          }}
                        >
                          <option value={0}>
                            selectionner une pierre a supprimer
                          </option>
                          {data && data.articlesAvecPierre.map((pierre, index) => (
                            pierre.articleId === parseInt(articleId) && (
                              <option value={pierre.typeDePierreId} key={pierre.id}>
                              {data.pierres && (data.pierres.find((nomP) => nomP.id === pierre.typeDePierreId)?.nom || "")}
                              </option>
                            )  
                          ))}
                        </Form.Select>

                        <Button
                          type="submit"
                          variant="primary"
                          className="my-2"
                        >
                          Supprimer cette pierre
                        </Button>
                      </Col>
                    </Row>
                  </Form>
           
          
        </Modal.Body>
      </Modal>
    </> 
  )
}

export default EditPierre