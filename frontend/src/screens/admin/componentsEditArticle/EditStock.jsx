import React, { useState } from 'react'
import {Form, Button, ButtonGroup, DropdownButton, Dropdown, Col, Modal, Row} from 'react-bootstrap'
import { toast } from 'react-toastify';
import {useModifStockMutation} from '../../../slices/articlesApiSlice'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {useGetDetailArticleQuery} from '../../../slices/DetailArticleSlice'
import Message from '../../../components/Message';

const EditStock = ({articleId}) => {

    const navigate = useNavigate();
    //data & routes
    //const {id: articleId} = useParams();
    const {data, isLoading, refetch, error } = useGetDetailArticleQuery(articleId)
    const [modifStock] = useModifStockMutation();

    const [tailleId, setTailleId] = useState(0);
    const [stock, setStock] = useState(0);
    const [stockDisponible, setStockDisponible] = useState("");


    const modifierStockHandler = async (e) => {
        e.preventDefault();
        const updatedArticleTaille = {
            id: articleId,
            tailleId,
            stock, 
        }
        if(tailleId === "" || tailleId.lenght === 0 || tailleId === 0) {
          toast.error('Veuillez selectionner une taille', {
            position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
            autoClose: 5000, // Ferme automatiquement après 5 secondes
            hideProgressBar: true, // Affiche la barre de progression
            closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
            pauseOnHover: true, // Met en pause le temps d'affichage en survolant
            draggable: true, // Permet de faire glisser le toast
            progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
        })
        }
        else if(stock === "" || stock.lenght === 0) {
          toast.error('Veuillez definir une valeur pour le stock', {
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
          const result = await modifStock(updatedArticleTaille);
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
    const [fullscreenStock, setFullscreenStock] = useState(true);
    const [showStock, setShowStock] = useState(false);
    function handleShowStock(breakpoint) {
        setFullscreenStock(breakpoint);
        setShowStock(true);
      }

      console.log()
  return (
    <>
      {values.map((v, idx) => (
        <Button key={idx} className="me-2 mb-2" onClick={() => handleShowStock(v)}>
          Modifier le
          {typeof v === 'string' && ` Stock`}
        </Button>
      ))}
      <Modal show={showStock} fullscreen={fullscreenStock} onHide={() => setShowStock(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter/Modifier STOCK</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Col className="col-12">
                <Form onSubmit={modifierStockHandler}>
                <br></br>
                <h3 style={{color: 'red'}}>Modifier le stock</h3>
                  <Form.Group controlId="stock">
                    <Form.Label>Stock disponible</Form.Label>
                    <Row>
                      <Col>
                        <Form.Control
                          type="number"
                          placeholder="selectionnez une taille"
                          value={stockDisponible}
                          //onChange={(e) => setStock(e.target.value)}
                          disabled
                        />
                      </Col>

                      <Col>
                        <Form.Select
                          aria-label=""
                          onChange={(e) => {
                            setTailleId(e.target.value);
                            const stockPourTaille = data.articleStock.find(elem => elem.tailleId === parseInt(e.target.value))?.stock;
                            setStockDisponible(stockPourTaille || 0); // Mettez à jour l'état du stock disponible
                            }}
                        >
                          <option value={0}>choisissez la taille</option>
                          {data && data.tailles.map((taille, index) => (
                            <option value={taille.id} key={index}>
                              {taille.taille}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                            <br></br>
                    <Col>
                        <Form.Control
                          type="number"
                          placeholder="modifier le stock"
                          value={stock}
                          onChange={(e) => setStock(e.target.value)}
                          min="0"
                        />
                      </Col>

                  </Form.Group>
                  <br></br>
                  <Button type="submit" variant="primary" className="my-2">
                    Mettre a jour le stock
                  </Button>
                </Form>
                </Col>
                {data && data.articleStock.map((elem, index) => (
                  elem.stock === 0 ? (
                    <Message key={index+'rupture'} variant='danger'><strong>Attention:</strong> La taille "<strong>{data && data.tailles.find(taille => taille.id === elem.tailleId)?.taille}</strong>" est en rupture de stock</Message>
                  ): elem.stock < 5 ? (
                    <Message key={index+'rupture'} variant='warning'><strong>Attention:</strong> La taille "<strong>{data && data.tailles.find(taille => taille.id === elem.tailleId)?.taille}</strong>" sera bientot en rupture de stock</Message>
                  ):""
                  
                ))}
                
          
        </Modal.Body>
      </Modal>
    </>
  )
}

export default EditStock