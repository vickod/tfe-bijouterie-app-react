import React, { useState } from 'react'
import {Form, Button, ButtonGroup, DropdownButton, Dropdown, Col, Modal, Row} from 'react-bootstrap'
import { toast } from 'react-toastify';
import {useModifPerleMutation, useSuppressionPerleMutation,} from '../../../slices/articlesApiSlice'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {useGetDetailArticleQuery} from '../../../slices/DetailArticleSlice'


const EditPerle = ({articleId}) => {
    const navigate = useNavigate();
    //data & routes
    //const {id: articleId} = useParams();
    const {data, isLoading, refetch, error } = useGetDetailArticleQuery(articleId)
    const [modifPerle] = useModifPerleMutation();
    const [suppressionPerle] = useSuppressionPerleMutation();

    // modal
    const values = ['md-down'];
    const [fullscreenPerles, setFullscreenPerles] = useState(true);
    const [showPerles, setShowPerles] = useState(false);

    //ARTICLES AVEC PERLES
    const [typeDePerle, setTypeDePerle] = useState("");
    const [nbPerles, setNbPerles] = useState(0);
    const [couleurPerle, setCouleurPerle] = useState(0);
    const [supprimerPerle, setSupprimerPerle] = useState("");


    const  ajouterPerlesHandler = async(e) => {
        e.preventDefault();
        const ifExist =  data && data?.articlesAvecPerle.find((item) => item.articleId === data.article.id && item.typeDePerleId === data.perles.find(perle => perle.type === typeDePerle)?.id) 
        const updatedArticlePerle = {
            id: articleId,
            typeDePerle,
            nbPerles,
            couleurPerle,
        }
        console.log(ifExist)
        if(typeDePerle === "" || typeDePerle === 0) {
          toast.error("Vous devez selectionner le type de perle", {
            position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
            autoClose: 5000, // Ferme automatiquement après 5 secondes
            hideProgressBar: true, // Affiche la barre de progression
            closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
            pauseOnHover: true, // Met en pause le temps d'affichage en survolant
            draggable: true, // Permet de faire glisser le toast
            progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
        });
        }
        else if (nbPerles === "" || nbPerles <= 0) {
          toast.error("Vous devez definir le nombre de perles", {
            position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
            autoClose: 5000, // Ferme automatiquement après 5 secondes
            hideProgressBar: true, // Affiche la barre de progression
            closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
            pauseOnHover: true, // Met en pause le temps d'affichage en survolant
            draggable: true, // Permet de faire glisser le toast
            progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
        });
        }
        else if (couleurPerle === "" || couleurPerle === 0) {
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
        else if (ifExist) {
          toast.error("Cette perle est deja associé!", {
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
          
          const result = await modifPerle(updatedArticlePerle);

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
              e.preventDefault();
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

    const deletePerle = async (e) => {
        e.preventDefault();
        const deletePierreArticle = {
            id: articleId,
            supprimerPerle, 
        }
        if(supprimerPerle === "" || supprimerPerle.length === 0 || supprimerPerle === 0) {
          toast.error('Veuillez selectionner une perle', {
            position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
            autoClose: 5000, // Ferme automatiquement après 5 secondes
            hideProgressBar: true, // Affiche la barre de progression
            closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
            pauseOnHover: true, // Met en pause le temps d'affichage en survolant
            draggable: true, // Permet de faire glisser le toast
            progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
        })
        }else {
          const result = await suppressionPerle(deletePierreArticle);
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
      

    function handleShowPerles(breakpoint) {
        setFullscreenPerles(breakpoint);
        setShowPerles(true);
      }


      
    

  return (
    <>
      {values.map((v, idx) => (
        <Button key={idx} className="me-2 mb-2" onClick={() => handleShowPerles(v)}>
          Ajouter/Supprimer
          {typeof v === 'string' && ` Perle`}
        </Button>
      ))}
      <Modal show={showPerles} fullscreen={fullscreenPerles} onHide={() => setShowPerles(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter/Modifier Perles</Modal.Title>
        </Modal.Header>
        <Modal.Body>

           
        <Col className="col-12">
                <Form onSubmit={ajouterPerlesHandler}>
                <Form.Group controlId="perle">
                    <Form.Label>Type de perle</Form.Label>
                    <Row>    
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder="choisissez un type de perle"
                          value={typeDePerle}
                          disabled
                        />
                      </Col>
                      <Col>
                        <Form.Select
                          aria-label=""
                          onChange={(e) => setTypeDePerle(e.target.value)}
                        >
                          <option defaultValue=""></option>
                          {data && data.perles.map((perle) => (
                            <option value={perle.type} key={perle.id}>
                              {perle.type}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                  </Form.Group>

                  <Form.Group controlId="nbPerles">
                    <Form.Label>Nombre de perles</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="nombre de perles"
                      value={nbPerles}
                      onChange={(e) => setNbPerles(e.target.value)}
                      min="0"
                    />   
                  </Form.Group>

                  <Form.Group controlId="couleur">
                    <Form.Label>Couleur perle</Form.Label>
                    <Row>    
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder="choisissez une couleur"
                          value={couleurPerle}
                          disabled
                        />
                      </Col>
                      <Col>
                        <Form.Select
                          aria-label=""
                          onChange={(e) => setCouleurPerle(e.target.value)}
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
                  <br></br>
                  <Button type="submit" variant="primary" className="my-2">
                   Ajouter cette perle
                  </Button>
                </Form>
                </Col>




                <Form onSubmit={deletePerle}>
                    <Row>
                      <Col>
                      <br></br>
                      <h3 style={{color: 'red'}}>Supprimer une perle</h3>
                        <Form.Select
                          aria-label=""
                          onChange={(e) => {
                            setSupprimerPerle(e.target.value);
                          }}
                        >
                          <option value={0}>
                            selectionner une perle a supprimer
                          </option>
                          {data && data.articlesAvecPerle.map((perle, index) => (
                            perle.articleId === parseInt(articleId) && (
                              <option value={perle.typeDePerleId} key={perle.id}>
                              {data.perles && (data.perles.find((nomPerle) => nomPerle.id === perle.typeDePerleId)?.type || "")}
                              </option>
                            )  
                          ))}
                        </Form.Select>

                        <Button
                          type="submit"
                          variant="primary"
                          className="my-2"
                        >
                          Supprimer cette perle
                        </Button>
                      </Col>
                    </Row>
                  </Form>
           
          
        </Modal.Body>
      </Modal>
    </>
  )
}

export default EditPerle


