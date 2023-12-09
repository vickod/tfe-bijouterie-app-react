import React, { useState } from 'react'
import {Form, Button, ButtonGroup, DropdownButton, Dropdown, Col, Modal, Row} from 'react-bootstrap'
import { toast } from 'react-toastify';
import { useAjoutDeTailleMutation, useSuppressionTailleMutation, } from '../../../slices/articlesApiSlice'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {useGetDetailArticleQuery} from '../../../slices/DetailArticleSlice'


const EditTaille = ({categorie, articleId}) => {
    const navigate = useNavigate();
    //data & routes
    //const {id: articleId} = useParams();
    const {data, isLoading, refetch, error } = useGetDetailArticleQuery(articleId)
    const [ajoutDeTaille] = useAjoutDeTailleMutation();
    const [suppressionTaille] = useSuppressionTailleMutation();

    const [addTaille, setAddTaille] = useState("")
    const [tailleId, setTailleId] = useState(0);
    const [supprimerTaille, setSupprimerTaille] = useState("");

    // ARTICLES GUIDE DE TAILLE
    const [mesure, setMesure] = useState(0);
    const [poids, setPoids] = useState(0);
    const [diametre, setDiametre] = useState(0);
    const [longeur, setLongeur] = useState(0)
    const [largeur, setLargeur] = useState(0)
    const [epaisseur, setEpaisseur] = useState(0)

    const submitTailleHandler = async (e) => {
    e.preventDefault();
    const updatedArticleTaille = {
        id: articleId,
        addTaille,
        tailleId,
        poids,
        diametre,
        longeur,
        largeur,
        epaisseur, 
    }
    if(!addTaille || addTaille === "") {
      toast.error('Veuillez definir une taille',{
        position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
        autoClose: 5000, // Ferme automatiquement après 5 secondes
        hideProgressBar: true, // Affiche la barre de progression
        closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
        pauseOnHover: true, // Met en pause le temps d'affichage en survolant
        draggable: true, // Permet de faire glisser le toast
        progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
    })
    }
    else if(poids.lenght <= 0 || poids <= 0) {
      toast.error('Veuillez definir le poids',{
        position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
        autoClose: 5000, // Ferme automatiquement après 5 secondes
        hideProgressBar: true, // Affiche la barre de progression
        closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
        pauseOnHover: true, // Met en pause le temps d'affichage en survolant
        draggable: true, // Permet de faire glisser le toast
        progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
    })
    }
    else if(categorie === "bagues" && (diametre.lenght <= 0 || diametre <= 0)) {
      toast.error('Veuillez definir le diametre', {
        position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
        autoClose: 5000, // Ferme automatiquement après 5 secondes
        hideProgressBar: true, // Affiche la barre de progression
        closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
        pauseOnHover: true, // Met en pause le temps d'affichage en survolant
        draggable: true, // Permet de faire glisser le toast
        progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
    })
    }
    else if(categorie === "Colliers et chaines" && (diametre.lenght <= 0 || diametre <= 0)) {
      toast.error('Veuillez definir la longueur', {
        position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
        autoClose: 5000, // Ferme automatiquement après 5 secondes
        hideProgressBar: true, // Affiche la barre de progression
        closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
        pauseOnHover: true, // Met en pause le temps d'affichage en survolant
        draggable: true, // Permet de faire glisser le toast
        progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
    })
    }
    else if(largeur.lenght <= 0 || largeur <= 0) {
      toast.error('Veuillez definir une largeur', {
        position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
        autoClose: 5000, // Ferme automatiquement après 5 secondes
        hideProgressBar: true, // Affiche la barre de progression
        closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
        pauseOnHover: true, // Met en pause le temps d'affichage en survolant
        draggable: true, // Permet de faire glisser le toast
        progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
    })
    }
    else if(epaisseur.lenght <= 0 || epaisseur <= 0) {
      toast.error('Veuillez definir une epaisseur', {
        position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
        autoClose: 5000, // Ferme automatiquement après 5 secondes
        hideProgressBar: true, // Affiche la barre de progression
        closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
        pauseOnHover: true, // Met en pause le temps d'affichage en survolant
        draggable: true, // Permet de faire glisser le toast
        progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
    })
    }
    else if(data && data.tailles.find(taille => taille.taille === addTaille)) {
      toast.error('cette taille existe deja, veullez la supprimer avant', {
        position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
        autoClose: 5000, // Ferme automatiquement après 5 secondes
        hideProgressBar: true, // Affiche la barre de progression
        closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
        pauseOnHover: true, // Met en pause le temps d'affichage en survolant
        draggable: true, // Permet de faire glisser le toast
        progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
    })
    }
    else {
      const result = await ajoutDeTaille(updatedArticleTaille);

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
    const deleteTailleHandler = async (e) => {
        e.preventDefault();
        const updatedArticleTaille = {
            id: articleId,
            supprimerTaille, 
        }
        if(supprimerTaille === "" || supprimerTaille.length === 0) {
        toast.error('Veuillez selectionner une taille', {
            position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
            autoClose: 5000, // Ferme automatiquement après 5 secondes
            hideProgressBar: true, // Affiche la barre de progression
            closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
            pauseOnHover: true, // Met en pause le temps d'affichage en survolant
            draggable: true, // Permet de faire glisser le toast
            progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
        })
        }else {
        const result = await suppressionTaille(updatedArticleTaille);
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

    const values = ['md-down'];
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
      }

    console.log("categorie taille"+categorie)
    console.log("article id taille: "+articleId)
  return (
    <>
      {values.map((v, idx) => (
        <Button key={idx} className="me-2 mb-2" onClick={() => handleShow(v)}>
          Ajouter/Supprimer
          {typeof v === 'string' && ` Taille`}
        </Button>
      ))}
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une taille</Modal.Title>
        </Modal.Header>
        <Modal.Body>


           {/* Modifier les mesures */}
           <Col className="col-12">
                <Form onSubmit={submitTailleHandler}>
                <br></br>
                <h3 style={{color: 'red'}}>Ajouter une taille</h3>
                  
                {/* <Form.Select
                          aria-label=""
                          onChange={(e) => {
                            setSupprimerTaille(e.target.value);
                          }}
                        >
                          <option value={0}>
                            selectionner une taille a modifier
                          </option>
                          {data && data.tailles.map((taille, index) => (
                            <option value={taille.id} key={taille.id}>
                              {taille.taille}
                            </option>
                          ))}
                </Form.Select> */}


                <Form.Group controlId="taille">
                    <Form.Label>Taille (g)</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nouvelle taille"
                      value={addTaille}
                      onChange={(e) => setAddTaille(e.target.value)}
                    />
                  </Form.Group>


                  <Form.Group controlId="poids">
                    <Form.Label>Poids (g)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="poids"
                      value={poids}
                      onChange={(e) => setPoids(e.target.value)}
                      //min="0"
                    />
                  </Form.Group>

                  <Form.Group controlId="diametre">
                    <Form.Label>Diametre (mm)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="diametre"
                      value={diametre}
                      onChange={(e) => setDiametre(e.target.value)}
                      //min="0"
                    />
                  </Form.Group>

                  <Form.Group controlId="longeur">
                    <Form.Label>Longeur (mm)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="longeur"
                      value={longeur}
                      onChange={(e) => setLongeur(e.target.value)}
                      //min="0"
                    />
                  </Form.Group>

                  <Form.Group controlId="largeur">
                    <Form.Label>Largeur (mm)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="largeur"
                      value={largeur}
                      onChange={(e) => setLargeur(e.target.value)}
                      //min="0"
                    />
                  </Form.Group>

                  <Form.Group controlId="epaisseur">
                    <Form.Label>Epaisseur (mm)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="epaisseur"
                      value={epaisseur}
                      onChange={(e) => setEpaisseur(e.target.value)}
                      //min="0"
                    />
                  </Form.Group>

                  <Button type="submit" variant="primary" className="my-2">
                    Ajouter/Modifier la taille
                  </Button>
                </Form>
                </Col>
            {/* END Modifier les mesures */}

          {/* AJOUTER UNE TAILLE */}
          {/* <Form onSubmit={deleteTailleHandler}>
                    <Row>
                      <Col>
                      <br></br>
                      <h3 style={{color: 'red'}}>Ajouter une nouvelle taille</h3>
                      <Form.Group controlId="taille">
                    <Form.Label><strong>Taille</strong></Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="taille"
                      value={addTaille}
                      onChange={(e) => setAddTaille(e.target.value)}
                      min="0"
                    />
                  </Form.Group>
                        <Button
                          type="submit"
                          variant="primary"
                          className="my-2"
                        >
                          Ajouter la taille
                        </Button>
                      </Col>
                    </Row>
             </Form> */}
          {/* END OF AJOUTER UNE TAILLE */}


           {/* SUPPRIMER UNE TAILLE */}
          <Form onSubmit={deleteTailleHandler}>
                    <Row>
                      <Col>
                      <br></br>
                      <h3 style={{color: 'red'}}>Supprimer une taille</h3>
                        <Form.Select
                          aria-label=""
                          onChange={(e) => {
                            setSupprimerTaille(e.target.value);
                          }}
                        >
                          <option value={0}>
                            selectionner une taille a supprimer
                          </option>
                          {data && data.tailles.map((taille, index) => (
                            <option value={taille.id} key={taille.id}>
                              {taille.taille}
                            </option>
                          ))}
                        </Form.Select>

                        <Button
                          type="submit"
                          variant="primary"
                          className="my-2"
                        >
                          Supprimer la taille
                        </Button>
                      </Col>
                    </Row>
                  </Form>
            {/* END SUPPRIMER UNE TAILLE */}


        

          
        </Modal.Body>
      </Modal>
    </>
  )
}

export default EditTaille