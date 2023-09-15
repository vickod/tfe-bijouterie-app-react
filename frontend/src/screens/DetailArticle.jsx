import {Link, useParams, useNavigate } from "react-router-dom";
import {Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap';
import { useGetDetailArticleQuery } from "../slices/DetailArticleSlice";
import { useState } from "react";
import Loader from '../components/Loader';
import Message from "../components/Message";
import { ajouterAuPanier } from '../slices/panierSlice';
import { useDispatch } from "react-redux";

const DetailArticle = () => {
  const {id: articleId} = useParams();
  const {data, isLoading, isError} = useGetDetailArticleQuery(articleId);
  const [tailleId, setTailleId] = useState(0);
  const [qty, setQty] = useState(1);
  const [gravures, setGravures] = useState([""]);
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
            <Image src={data.article.image} alt={data.article.nom} fluid />
          )}
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            {data.article && (
              <>
                <ListGroup.Item>
                  <h3>{data.article.nom}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p>{data.article.message}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  Prix: {data.article.prix}€
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

                    {qty && tailleId !== 0 ? (
                      Array.from({ length: qty }, (_, index) => (
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
                    ) : (
                      ""
                    )}
                  </>
                )}

                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={tailleId === 0 || stockDispo <= 0}
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
  )
}
export default DetailArticle