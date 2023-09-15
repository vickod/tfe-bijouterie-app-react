import { useEffect, useState } from "react"
import {useParams} from 'react-router-dom'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import {Button, Row, Col, ListGroup, Image, Card, Dropdown} from 'react-bootstrap'
import CheckoutSteps from "../components/CheckoutSteps";
import {toast} from 'react-toastify'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useCreateCommandeMutation } from "../slices/commandesApiSlice";
import { effacerPanier } from "../slices/panierSlice";
import axios from 'axios'
//paypal
import {PayPalButtons, usePayPalScriptReducer} from '@paypal/react-paypal-js'
import { useGetDetailsCommandeQuery, usePayCommandeMutation, useGetPaypalClientIdQuery } from "../slices/commandesApiSlice";
import { useGetMesCommandesQuery } from "../slices/commandesApiSlice";
//end paypal

const Commande = () => {
const navigate = useNavigate()
const panier = useSelector((state) => state.panier);
const {userInfo} = useSelector((state)=> state.auth)
const [createCommande, {isLoading, error}] = useCreateCommandeMutation();
const dispatch = useDispatch();
useEffect(() => {
    if(!userInfo.adresse) {
        navigate('/verification');
    }else if(!panier.payementMethod) {
        navigate("/payement");
    }
},[ userInfo.adresse, panier.payementMethod, navigate])
const [commandeId, setCommandeId] = useState(null);
// const [premiereCommande, setPremiereCommande] = useState(false);
// const [total, setTotal] = useState(panier.prixTotale);

//paypal
const [payCommande, {isLoading: loadingPay}] = usePayCommandeMutation();
const [{isPending}, paypalDispatch] = usePayPalScriptReducer()
const {data: paypal, isLoading: loadingPayPal, error: errorPayPal} = useGetPaypalClientIdQuery();
const {data: commandes} = useGetMesCommandesQuery();


useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'EUR',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      if (panier.articlesDuPanier && commandes && userInfo) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, panier.articlesDuPanier , paypal, paypalDispatch, commandes, userInfo]);
  



function onApprove(data, actions) {
    if (commandes && Array.isArray(commandes) && commandes.length === 0) {
        return actions.order.capture()
    .then(async function ({details}) {
      try {             
        const res = await createCommande({
            articles: panier.articlesDuPanier,
            utilisateur: userInfo,
            methodeDePayement: panier.payementMethod,
            prixTotale: panier.prixApresRabais5,
          }).unwrap();
        dispatch(effacerPanier());
        setCommandeId(res.id);    
        await payCommande({commandeId, details });
        //refetch();
        toast.success('payement reussi! ', {
          position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
          autoClose: 5000, // Ferme automatiquement après 5 secondes
          hideProgressBar: true, // Affiche la barre de progression
          closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
          pauseOnHover: true, // Met en pause le temps d'affichage en survolant
          draggable: true, // Permet de faire glisser le toast
          progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
      });
      navigate(`/commandes/${res.id}`)
      window.location.reload()
      }catch(err) {
        toast.error(err?.data?.message || err.message)
        console.log(err?.data?.message || err.message)
      }
    }).catch((err) => {
        console.log(err)
    })
    }
    else {
        return actions.order.capture()
    .then(async function ({details}) {
      try {             
        const res = await createCommande({
            articles: panier.articlesDuPanier,
            utilisateur: userInfo,
            methodeDePayement: panier.payementMethod,
            prixTotale: panier.prixTotale,
          }).unwrap();
        dispatch(effacerPanier());
        setCommandeId(res.id);    
        await payCommande({commandeId, details });
        //refetch();
        toast.success('payement reussi! ', {
          position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
          autoClose: 5000, // Ferme automatiquement après 5 secondes
          hideProgressBar: true, // Affiche la barre de progression
          closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
          pauseOnHover: true, // Met en pause le temps d'affichage en survolant
          draggable: true, // Permet de faire glisser le toast
          progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
      });
      navigate(`/commandes/${res.id}`)
      window.location.reload()
      }catch(err) {
        toast.error(err?.data?.message || err.message)
        console.log(err?.data?.message || err.message)
      }
    }).catch((err) => {
        console.log(err)
    })
    }
  }
  

  


  function createOrder(data, actions) {
    if (commandes && Array.isArray(commandes) && commandes.length === 0) {
      return actions.order
        .create({
          purchase_units: [
            {
              amount: { value: panier.prixApresRabais5 },
            },
          ],
        })
        .then((orderID) => {
          return orderID; 
        });
    }else {
        return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: panier.prixTotale },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
    } 
  }
  
  



  async function onApproveTest() {
    //refetch();
    try {
      const res = await createCommande({
        articles: panier.articlesDuPanier,
        utilisateur: userInfo,
        methodeDePayement: panier.payementMethod,
        prixTotale: panier.prixTotale,
      }).unwrap();
      dispatch(effacerPanier());
      setCommandeId(res.id);
      await payCommande({ commandeId, details: { payer: {} } });
      //navigate(`/commandes/${res.id}`)
      toast.success("payement reussi");
    } catch (err) {
      toast.error(err);
    }
  }
  
  function onError(err) {
    toast.error(err.message)
  }

  
  const deliverHandler = async () => {
    // try {
    //     await commandeDeliver(commandeId);
    //     refetch();
    //     toast.success('commande livré')
    // } catch (err) {
    //     toast.error(err?.data?.message || err.message)
    // }
  }



//end paypal


  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>Coordonnées</h3>
              <p>
                <strong>Nom:</strong> {userInfo.nom} {userInfo.prenom}
              </p>
              {userInfo.telephone && (
                <p>
                  <strong>telephone:</strong> {userInfo.telephone}
                </p>
              )}
              <p>
                <strong>Adresse de livraison:</strong> {userInfo.adresse}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h3>Mode de paiement</h3>
              <p>
                <strong>Methode:</strong> {panier.payementMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h3>Articles</h3>
              {panier.articlesDuPanier.length === 0 ? (
                <Message>Ton panier est vide !</Message>
              ) : (
                <ListGroup variant="flush">
                  {panier.articlesDuPanier.map((article, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={article.image}
                            alt={article.nom}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col>
                          <Link to={`/articles/${article.id}`}>
                            {article.nom}
                          </Link>
                        </Col>

                        <Col>taille: {article.taille}</Col>

                        <Col>
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
                                article.gravures.filter(
                                  (gravure) =>
                                    gravure !== null && gravure !== ""
                                ).length
                              }
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              {article.gravures
                                .filter(
                                  (gravure) =>
                                    gravure !== null && gravure !== ""
                                ) // Exclure les chaînes vides et les valeurs null
                                .map((gravure, index) => (
                                  <Dropdown.Item key={index}>
                                    {gravure}
                                  </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                          </Dropdown>
                        </Col>

                        <Col md={4}>
                          {article.qty} X €{article.prix} = €
                          {article.qty * article.prix}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Récapitulatif</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>PRIX/HTVA:</Col>
                  <Col>€{panier.htva}</Col>
                </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                <Row>
                  <Col>+TVA 21%:</Col>
                  <Col>€{panier.tva}</Col>
                </Row>
                </ListGroup.Item>
                {Array.isArray(commandes) && commandes.length === 0  ? (
                    <>
                    <ListGroup.Item>
                    <Row>
                        <Col><strong style={{color: 'red'}}>-5% premier achat:</strong></Col>
                        <Col>€{(panier.prixTotale*0.05).toFixed(2)}</Col>
                    </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col><strong>TOTAL:</strong></Col>
                            <Col><strong>€{panier.prixTotale-(panier.prixTotale*0.05)}</strong></Col>
                        </Row>
                    </ListGroup.Item>
                    </>
                ):(
                    <ListGroup.Item>
                    <Row>
                    <Col><strong>TOTAL:</strong></Col>
                    <Col><strong>€{panier.prixTotale}</strong></Col>
                    </Row>
                    </ListGroup.Item>
                )}
            
                

              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>

              {/* <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={panier.articlesDuPanier.length === 0}
                  onClick={passerLaCommande}
                >
                  Passer la commande
                </Button>
                {isLoading && <Loader />}
              </ListGroup.Item> */}
              


              {/* PAYPAL */}
              {panier && panier.articlesDuPanier.length>0 ? (
                <ListGroup.Item>     
              {isPending ? <Loader /> : (
                              <div>
                                <Button onClick={onApproveTest} style={{marginBottom: '10px'}}>Test payer commande</Button>
                                <div>

                                  <PayPalButtons 
                                  createOrder={createOrder}
                                  onApprove={onApprove}
                                  onError={onError}
                                  ></PayPalButtons>

                                </div>
                              </div>
                            )}
                </ListGroup.Item>
              ):(null) }
              
               {/* END PAYPAL */}

            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Commande