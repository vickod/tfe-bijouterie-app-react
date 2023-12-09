import {Link, useParams, useNavigate } from "react-router-dom";
import {Row, Col, Image, ListGroup, Card, Button, Form, Modal, Table} from 'react-bootstrap';
import { useGetDetailArticleQuery } from "../slices/DetailArticleSlice";
import React, { useState } from "react";
import Loader from '../components/Loader';
import Message from "../components/Message";
import { ajouterAuPanier } from '../slices/panierSlice';
import { useDispatch, useSelector } from "react-redux";
import {toast} from 'react-toastify'

const DetailArticle = () => {
  const {userInfo} = useSelector((state)=> state.auth)
  const {id: articleId} = useParams();
  const {data, isLoading, isError} = useGetDetailArticleQuery(articleId);
  const [tailleId, setTailleId] = useState(0);
  const [qty, setQty] = useState(1);
  const [gravures, setGravures] = useState([""]);
  const [lgShow, setLgShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

const handleTailleChange = (e) =>{
    setTailleId(e.target.value)
    if (parseInt(e.target.value) === 0) {
        setTailleId(0);
    }
}
//let newGravures = []
const addGravure = (e, index) => {
    const gravure = e.target.value.trim();
    const newGravures = [...gravures];
    newGravures[index] = gravure;
    setGravures(newGravures)
};

const getStock = data ? data.articleStock  //stock selon la taille selectionné
    .filter(elem => elem.tailleId === parseInt(tailleId)) 
    .map(elem => elem.stock) : 0
const stockDispo = getStock[0]

const getTaille = data ? data.tailles
.filter(elem => elem.id === parseInt(tailleId))
.map(elem => elem.taille) : 0
const taille = getTaille[0]

const prixHtva = data ? (data.article.prix/1.21).toFixed(2) : "";
const tva = data ? (data.article.prix-(data.article.prix/1.21)).toFixed(2) : "";


const ajouteAuPanier = () => {
  if(data && data.article.prix <=0) {
    toast.error("Impossible d'ajouter cet article dans le panier", {
      position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
      autoClose: 5000, // Ferme automatiquement après 5 secondes
      hideProgressBar: true, // Affiche la barre de progression
      closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
      pauseOnHover: true, // Met en pause le temps d'affichage en survolant
      draggable: true, // Permet de faire glisser le toast
      progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
  })
  }
  else if(userInfo && (userInfo.roleId !== 1 && userInfo.role !== 1)) {
    toast.error("Veuillez vous connecter au tant que client", {
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
    const gravuresFiltrees = gravures.filter((gravure) => gravure !== null && gravure !== "" && gravure !== undefined);
    setGravures(gravuresFiltrees);
    dispatch(ajouterAuPanier({
        ...data.article,
        qty,
        taille,
        tailleId,
        gravures: gravuresFiltrees, 
        prixHtva,
        tva
    }));
    navigate('/panier');
  }
  
}

const values = ['xl-down'];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  
  
  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }
  


  //console.log(data ? data.tailles: "")
  console.log(data && (data.guideDeTailleArticle.find((diametre)=> diametre.articleId === data.article.id && diametre.tailleId === 1 && diametre.mesureId === 2)?.valeur_mesure || "/"))
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Retour
      </Link>

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data?.message || isError.error}
        </Message>
      ) : (
        <Row>
          <Col md={5}>
            {data.article && (
              <>
              <Image src={data.article.image} alt={data.article.nom} fluid />
              <ListGroup.Item>
                    <h3>{data.article.nom}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <p>{data.article.message}</p>
                  </ListGroup.Item>
                  </>
            )}
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              {data.article && (
                <>
                  {/* <ListGroup.Item>
                    <h3>{data.article.nom}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <p>{data.article.message}</p>
                  </ListGroup.Item> */}
                  <ListGroup.Item>
                    <h3 style={{ color: "black" }}>
                      {/* {data &&
                        (data.categories.find(
                          (categorie) =>
                            categorie.id === data.article.categorieId
                        )?.nom ||
                          "")} */}
                          Caractéristiques
                    </h3>
                    <p>
                      <strong>Type: </strong>
                      {data.article?.type || "/"}
                    </p>
                    <p>
                      <strong>Matiere: </strong>{" "}
                      {data.matieres
                        ? data.matieres.find(
                            (matiere) =>
                              matiere.id === data.article.typeDeMatiereId
                          )?.matiere || "/"
                        : "/"}
                    </p>
                    <p>
                      <strong>Ct: </strong>{" "}
                      {data.carats
                        ? data.carats.find(
                            (carat) => carat.id === data.article.nbCaratId
                          )?.valeur || "/"
                        : "/"}
                    </p>

                    {data &&
                      data.articlesAvecPierre.find(
                        (art) => art.articleId === data.article.id
                      ) && (
                        <>
                        <br></br>
                          <h5 style={{ color: "black" }}>Pierres:</h5>
                          {data &&
                            data.articlesAvecPierre.map(
                              (elem, index) =>
                                data &&
                                elem.articleId === data.article.id && (
                                  <Row key={index}>
                                    <Col>
                                      <p>
                                        <strong>Pierre:</strong>{" "}
                                        {data.pierres
                                          ? data.pierres.find(
                                              (pierre) =>
                                                pierre.id ===
                                                elem.typeDePierreId
                                            )?.nom || ""
                                          : ""}
                                      </p>
                                      <p>
                                        <strong>Couleur:</strong>{" "}
                                        {data.couleurs
                                          ? data.couleurs.find(
                                              (couleur) =>
                                                couleur.id === elem.couleurId
                                            )?.nom || ""
                                          : ""}
                                      </p>
                                      <p>
                                        <strong>Nombre pierres:</strong>{" "}
                                        {elem.nbPierres}
                                      </p>
                                      <p>
                                        <strong>Ct:</strong>{" "}
                                        {elem?.nbCarats || "/"}
                                      </p>
                                      <p>---------------</p>
                                    </Col>
                                  </Row>
                                  
                                )
                            )}
                        </>
                      )}

                    {data &&
                      data.articlesAvecPerle.find(
                        (art) => art.articleId === data.article.id
                      ) && (
                        <>
                        <br></br>
                          <h5 style={{ color: "black" }}>Perles:</h5>
                          {data &&
                            data.articlesAvecPerle.map(
                              (elem, index) =>
                                data &&
                                elem.articleId === data.article.id && (
                                  <Row key={index}>
                                    <Col>
                                      <p>
                                        <strong>Type de perle:</strong>{" "}
                                        {data.perles
                                          ? data.perles.find(
                                              (perle) =>
                                                perle.id === elem.typeDePerleId
                                            )?.type || ""
                                          : ""}
                                      </p>
                                      <p>
                                        <strong>Couleur:</strong>{" "}
                                        {data.couleurs
                                          ? data.couleurs.find(
                                              (couleur) =>
                                                couleur.id === elem.couleurId
                                            )?.nom || ""
                                          : ""}
                                      </p>
                                      <p>
                                        <strong>Nombre perles:</strong>{" "}
                                        {elem.nbPerles}
                                      </p>
                                      <p>---------------</p>
                                    </Col>
                                  </Row>
                                )
                            )}
                        </>
                      )}
                  </ListGroup.Item>

                  {/* <ListGroup.Item>Prix: {data.article.prix}€</ListGroup.Item> */}

                  <ListGroup.Item>
                    <>
                      <Button onClick={() => setLgShow(true)}>
                        Guide des tailles
                      </Button>
                      <Modal
                        size="lg"
                        show={lgShow}
                        onHide={() => setLgShow(false)}
                        aria-labelledby="example-modal-sizes-title-lg"
                      >
                        <Modal.Header closeButton>
                          <Modal.Title id="example-modal-sizes-title-lg">
                          Guide des tailles
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          {data && data.article.categorieId === 1 && (
                            <Image
                            src="/img/bb.png"
                            alt={data.article.nom}
                            fluid
                          />
                          )}
                          {data && data.article.categorieId === 2 && (
                            <Image
                            src="/img/bbb.png"
                            alt={data.article.nom}
                            fluid
                          />
                          )}
                          {data && data.article.categorieId === 3 && (
                            <Image
                            src="/img/cc.png"
                            alt={data.article.nom}
                            fluid
                          />
                          )}
                          
                          <br></br><br></br><br></br>

                          <>
                            {/* {data && data.tailles.map((elem, index) => ( */}
                            <Table striped bordered hover>
                              <thead>
                                <tr>
                                  <th>#Taille</th>
                                  {/* {data && data.guideDeTailleArticle.find(article => article.articleId === data.article.id && article.mesureId === 2) ? ( */}
                                  <th>diametre (mm)</th>
                                  {/* ):""} */}
                                  <th>Longueur (mm)</th>
                                  <th>Largeur (mm)</th>
                                  <th>Epaisseur (mm)</th>
                                  <th>Poids (g)</th>
                                </tr>
                              </thead>
                              <tbody>
                                {data &&
                                  data.tailles.map((elem, index) => (
                                    <React.Fragment key={index}>
                                      <tr>
                                        <td>
                                          <strong>{elem.taille}</strong>
                                        </td>
                                        <td>
                                          {data.guideDeTailleArticle &&
                                            (data.guideDeTailleArticle.find(
                                              (diametre) =>
                                                diametre.articleId ===
                                                  data.article.id &&
                                                diametre.tailleId === elem.id &&
                                                diametre.mesureId === 2
                                            )?.valeur_mesure ||
                                              "/")}
                                        </td>
                                        <td>
                                          {data.guideDeTailleArticle &&
                                            (data.guideDeTailleArticle.find(
                                              (longueur) =>
                                                longueur.articleId ===
                                                  data.article.id &&
                                                longueur.tailleId === elem.id &&
                                                longueur.mesureId === 3
                                            )?.valeur_mesure ||
                                              "/")}
                                        </td>
                                        <td>
                                          {data.guideDeTailleArticle &&
                                            (data.guideDeTailleArticle.find(
                                              (largeur) =>
                                                largeur.articleId ===
                                                  data.article.id &&
                                                largeur.tailleId === elem.id &&
                                                largeur.mesureId === 4
                                            )?.valeur_mesure ||
                                              "/")}
                                        </td>
                                        <td>
                                          {data.guideDeTailleArticle &&
                                            (data.guideDeTailleArticle.find(
                                              (epaisseur) =>
                                                epaisseur.articleId ===
                                                  data.article.id &&
                                                epaisseur.tailleId === elem.id &&
                                                epaisseur.mesureId === 5
                                            )?.valeur_mesure ||
                                              "/")}
                                        </td>
                                        <td>
                                          {data.guideDeTailleArticle &&
                                            (data.guideDeTailleArticle.find(
                                              (poids) =>
                                                poids.articleId ===
                                                  data.article.id &&
                                                poids.tailleId === elem.id &&
                                                poids.mesureId === 1
                                            )?.valeur_mesure ||
                                              "/")}
                                        </td>
                                      </tr>
                                    </React.Fragment>
                                  ))}
                              </tbody>
                            </Table>
                            {/* )} */}
                          </>
                        </Modal.Body>
                      </Modal>
                    </>
                  </ListGroup.Item>
                </>
              )}
            </ListGroup>
          </Col>
          <Col md={3}>
            {data.article && (
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Prix:</Col>
                      <Col>
                        <strong>{data.article.prix}€</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {/* Taille article */}
                  <ListGroup.Item>
                    <Row>
                      <Col>Taille:</Col>
                      <Col>
                        <Form.Select
                          aria-label="Default select example"
                          onChange={handleTailleChange}
                        >
                          <option value={0}>aucune</option>
                          {data.tailles.map((taille, index) => (
                            <option key={index} value={taille.id}>
                              {taille.taille}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {tailleId === 0 ? (
                          <strong>"choisissez une taille"</strong>
                        ) : stockDispo > 0 ? (
                          <strong>disponible</strong>
                        ) : (
                          <strong>indisponible</strong>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {stockDispo > 0 && (
                    <>
                      <ListGroup.Item>
                        <Row>
                          <Col>Quantité:</Col>
                          <Col>
                            <Form.Control
                              as="select"
                              value={qty}
                              onChange={(e) => setQty(Number(e.target.value))}
                            >
                              {[...Array(stockDispo).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      {qty && tailleId !== 0
                        ? Array.from({ length: qty }, (_, index) => (
                            <ListGroup.Item key={`gravure${index}`}>
                              <Row>
                                <Col>Gravure: {index + 1}</Col>
                                <Col>
                                  <Form.Control
                                    size="sm"
                                    type="text"
                                    placeholder="max 10 caracteres"
                                    maxLength="10"
                                    onChange={(e) => addGravure(e, index)}
                                  />
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          ))
                        : ""}
                    </>
                  )}

                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={
                        tailleId === 0 ||
                        stockDispo <= 0 ||
                        (data ? data.article.prix <= 0 : "")
                      }
                      onClick={ajouteAuPanier}
                    >
                      Ajouter au panier
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            )}
          </Col>
        </Row>
      )}
    </>

    // <>
    //     <Link className="btn btn-light my-3" to="/">Retour</Link>

    //     {isLoading ? (
    //         <Loader />
    //     ) : isError ? (
    //         <Message variant='danger'>{isError?.data?.message || isError.error}</Message>
    //     ) : (
    //         <Row>
    //         <Col md={5} >
    //             <Image src={data.article.image} alt={data.article.nom} fluid />
    //         </Col>
    //         <Col md={4} >
    //             <ListGroup variant="flush">
    //                 <ListGroup.Item>
    //                     <h3>{data.article.nom}</h3>
    //                 </ListGroup.Item>
    //             </ListGroup>
    //             <ListGroup.Item>
    //                    <p>{data.article.message}</p>
    //             </ListGroup.Item>
    //             <ListGroup.Item>
    //                    Prix: {data.article.prix}€
    //             </ListGroup.Item>
    //         </Col>
    //         <Col md={3} >
    //             <Card>
    //                 <ListGroup variant="flush">
    //                     <ListGroup.Item>
    //                         <Row>
    //                             <Col>
    //                                 Prix:
    //                             </Col>
    //                             <Col>
    //                                 <strong>{data.article.prix}€</strong>
    //                             </Col>
    //                         </Row>
    //                     </ListGroup.Item>

    //                     {/* Taille article */}
    //                     <ListGroup.Item>
    //                         <Row>
    //                             <Col>
    //                                 Taille:
    //                             </Col>
    //                             <Col>

    //                             <Form.Select aria-label="Default select example" onChange={handleTailleChange} >
    //                                 <option  value={0}>aucune</option>
    //                             {data.tailles.map((taille, index)=>(
    //                                 <option key={index} value={taille.id}>{taille.taille}</option>
    //                             ))}
    //                             </Form.Select>
    //                             </Col>
    //                         </Row>
    //                     </ListGroup.Item>

    //                     <ListGroup.Item>
    //                         <Row>

    //                             <Col>
    //                                 Status:
    //                             </Col>
    //                             <Col>
    //                                 {tailleId === 0 && (
    //                                     <strong>"choisissez une taille"</strong>
    //                                 )}
    //                                 {tailleId !== 0 && stockDispo>0 &&(
    //                                     <strong>disponible</strong>
    //                                 )}
    //                                 {tailleId !== 0 && stockDispo<=0 &&(
    //                                     <strong>indisponible</strong>
    //                                 )}

    //                             </Col>
    //                         </Row>
    //                     </ListGroup.Item>

    //                     {stockDispo > 0 && (
    //                         <>
    //                         <ListGroup.Item >
    //                                 <Row>
    //                                     <Col>Quantité:</Col>
    //                                     <Col>
    //                                         <Form.Control
    //                                         as='select'
    //                                          value = {qty}
    //                                          onChange={(e) => setQty(Number(e.target.value))}
    //                                          >
    //                                         {[...Array(stockDispo).keys()]
    //                                         .map((x) => (
    //                                             <option key={x + 1} value={x+1}>
    //                                                 {x+1}
    //                                             </option>
    //                                         ))}
    //                                         </Form.Control>
    //                                     </Col>
    //                                 </Row>
    //                         </ListGroup.Item>

    //                             {qty && tailleId !== 0 ? (
    //                                 Array.from({ length: qty }, (_, index) => (
    //                                 <ListGroup.Item key={`gravure${index}`}>
    //                                 <Row>
    //                                     <Col>
    //                                         Gravure: {index+1}
    //                                     </Col>
    //                                     <Col>
    //                                     <Form.Control size="sm"
    //                                     type="text"
    //                                     placeholder="max 10 caracteres"
    //                                     maxLength="10"
    //                                     onChange={(e) => addGravure(e, index)}
    //                                     />

    //                                     </Col>
    //                                 </Row>
    //                                 </ListGroup.Item>

    //                             ))) : (
    //                                 ""
    //                             )}

    //                         </>
    //                      )}

    //                     <ListGroup.Item>
    //                        <Button className="btn-block" type="button"
    //                        disabled={tailleId === 0 || stockDispo<=0}
    //                         onClick={ajouteAuPanier}
    //                        >
    //                             Ajouter au panier
    //                         </Button>

    //                     </ListGroup.Item>

    //                 </ListGroup>
    //             </Card>
    //         </Col>
    //     </Row>
    //     ) }

    // </>
  );
}
export default DetailArticle