import { useParams, Link } from "react-router-dom"
import {Row, Col, ListGroup, Image, Form, Button, Card, Dropdown, ListGroupItem} from 'react-bootstrap'
import Message from "../components/Message"
import Loader from "../components/Loader"
import { useGetDetailsCommandeQuery, 
  usePayCommandeMutation, 
  useCommandeDeliverMutation,
  useCommandeDeliverLivreurMutation 
} from "../slices/commandesApiSlice"
import React from 'react';
import {toast} from 'react-toastify'
import { UseSelector, useSelector, } from "react-redux/es/hooks/useSelector"


const DetailsCommande = () => {
const {id: commandeId} = useParams();
const {data, refetch, isLoading, isError} = useGetDetailsCommandeQuery(commandeId);
const [payCommande, {isLoading: loadingPay}] = usePayCommandeMutation();
const [commandeDeliver, {isLoading: loadingDeliver}] = useCommandeDeliverMutation();
const [commandeDeliverLivreur] = useCommandeDeliverLivreurMutation();

//console.log(data? data.ligneDeCommande : "")
const {userInfo} = useSelector((state) => state.auth);

let paidAtFormatted;
if (data && data.commande && data.commande.paidAt) {
  const paidAtDate = new Date(data.commande.paidAt);
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  paidAtFormatted = paidAtDate.toLocaleDateString('fr-FR', options); 
} else {
  paidAtFormatted = "Date non disponible";
}
function formatDateDeliver() {
  let deliveredAtFormatted;
  if (data && data.commande && data.commande.deliveredAt) {
    const deliveredAt = new Date(data.commande.paidAt);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    deliveredAtFormatted = deliveredAt.toLocaleDateString('fr-FR', options); 
  } else {
    deliveredAtFormatted = "Date non disponible";
  }
  return deliveredAtFormatted
}

const total = data ? data.commande.total : null
const prixHTVA = data ? (total/1.21).toFixed(2) : null
const tva = data ? (total-prixHTVA).toFixed(2) : null
//promo 5% premiere commande
const rabais = data? ((total*1.05 - total)*1.05).toFixed(2) : null
const prixPlein = data ? parseInt((total + parseFloat(rabais)).toFixed(2)) : null;
const prixHTVAAvecRabais = data ? (prixPlein/1.21).toFixed(2) : null
const tvaAvecRabais = data ? (prixPlein-prixHTVAAvecRabais).toFixed(2) : null



const deliverHandler = async () => {
  try {
      if(userInfo.role === 2) {
        await commandeDeliver(commandeId);
      }
      if(userInfo.role === 3) {
        await commandeDeliverLivreur(commandeId)
      }
     
      refetch();
      toast.success('la commandé a été livré! ', {
        position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
        autoClose: 5000, // Ferme automatiquement après 5 secondes
        hideProgressBar: true, // Affiche la barre de progression
        closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
        pauseOnHover: true, // Met en pause le temps d'affichage en survolant
        draggable: true, // Permet de faire glisser le toast
        progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
    });
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
  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Message variant="danger" />
  ) : (
    data &&
    data.commande &&
    data.ligneDeCommande && (
      <>
        <h1> Commande: n°{data.commande.id}</h1>
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Livraison</h2>
                <p>
                  <strong>Nom:</strong>{" "}
                  {data.utilisateur?.prenom || "/"} {data.utilisateur?.nom || ""}
                  
                </p>
                <p>
                  <strong>Email:</strong> {data.utilisateur?.email || "/"}
                </p>
                <p>
                  <strong>Adresse:</strong> {data.utilisateur?.adresse || "/"}
                </p>
                {data.commande.isDelivered ? (
                  <Message variant="success">
                    <strong>Statut:</strong> livré le:{" "}
                    {formatDateDeliver()}
                  </Message>
                ) : !data.commande.isDelivered && data.commande.isPaid ? (
                  <Message variant="warning">
                    <strong>Statut:</strong> En cours...
                  </Message>
                ) : (
                  <Message variant="danger">
                    <strong>Statut:</strong> en attente de payement.
                  </Message>
                )}
              </ListGroup.Item>

              {userInfo &&
                  userInfo.role !== 3 && (<>
              <ListGroup.Item>
                <h2>Methode de paiement</h2>
                <p>
                  <strong>Methode: </strong>
                  {data.commande.methodeDePayement}
                </p>
                {data.commande.isPaid && (
                  <Message variant="success">
                    Payé le: {paidAtFormatted}
                  </Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>articles</h2>
                {data.ligneDeCommande.map((ligne, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      {data.articles
                        .filter((article) => article.id === ligne.articleId)
                        .map((filteredArticle) => (
                          <React.Fragment key={filteredArticle.id}>
                            <Col md={1}>
                              <Image
                                src={`${filteredArticle.image}`}
                                alt={filteredArticle.nom}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col md={3}>
                              <Link
                                to={`/articles/${filteredArticle.id}`}
                                style={{
                                  display: "block",
                                  overflow: "hidden",
                                  whiteSpace: "nowrap",
                                  textOverflow: "ellipsis",
                                  maxWidth: "100%",
                                  width: "10em", // Changer la largeur max souhaitée
                                }}
                              >
                                {filteredArticle.nom}
                              </Link>
                            </Col>

                            <Col md={2}>
                              {data.tailles.map(
                                (taille) =>
                                  taille.id === ligne.tailleId && (
                                    <span key={taille.id}>
                                      taille: {taille.taille}
                                    </span>
                                  )
                              )}
                            </Col>

                            <Col md={2}>
                              <Dropdown>
                                <style>
                                  {`
                                .dropdown-toggle::after {
                                 display: none;
                                 }
                                 `}
                                </style>
                                <Dropdown.Toggle
                                  as="a"
                                  variant="link"
                                  id="dropdown-basic"
                                  style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                    cursor: "pointer",
                                  }}
                                >
                                  Gravures:{" "}
                                  { 
                                    data.gravures.filter((gravure) => gravure.ligneDeCommandeId === ligne.id).length
                                  }
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  {data.gravures.filter((gravure) => gravure.ligneDeCommandeId === ligne.id)
                                    .map((gravure, index) => (
                                      <Dropdown.Item key={index}>
                                        {gravure.message}
                                      </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                              </Dropdown>
                            </Col>
                            
                            


                            <Col md={3}>
                              {ligne.quantite} x €{ligne.prix} = €
                              {ligne.quantite * ligne.prix}
                            </Col>
                          </React.Fragment>
                        ))}
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup.Item>
              </>
              )}


            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">

                <ListGroup.Item>
                  <h2>Commande</h2>
                </ListGroup.Item>
                {userInfo &&
                  userInfo.role !== 3 && (<>
                {data.commande.premiereCommande ? (
                  
                  <>
                    <ListGroup.Item>
                      <Row>
                        <Col> Prix HTVA:</Col>
                        <Col>{prixHTVAAvecRabais}€</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col> TVA 21%:</Col>
                        <Col>{tvaAvecRabais}€</Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col style={{ color: "red" }}> -5% premier achat:</Col>
                        <Col>{rabais}€</Col>
                      </Row>
                    </ListGroup.Item>
                  </>
                ) : (
                  <>
                    <ListGroup.Item>
                      <Row>
                        <Col> Prix HTVA:</Col>
                        <Col>€{prixHTVA}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col> TVA 21%:</Col>
                        <Col>€{tva}</Col>
                      </Row>
                    </ListGroup.Item>
                  </>
                )}

                <ListGroup.Item>
                  <Row>
                    <Col> Total:</Col>
                    <Col>€{total}€</Col>
                  </Row>
                </ListGroup.Item>
                </>
                )}

                {loadingDeliver && <Loader />}
                {userInfo &&
                  (userInfo.role === 2 ||userInfo.role === 3) &&
                  data.commande.isPaid &&
                  !data.commande.isDelivered && (
                    <ListGroup.Item>
                      <Button
                        type="button"
                        className="btn btn-block"
                        onClick={() => deliverHandler()}
                      >
                        Confirmer la livraison
                      </Button>
                    </ListGroup.Item>
                  )}   

              </ListGroup>
            </Card>
          </Col>
        </Row>
      </>
    )
  );
}

export default DetailsCommande