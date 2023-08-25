import {useParams } from "react-router-dom";
import {useState, useEffect} from "react"
import { Link } from "react-router-dom";
import {Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap';
import axios from "axios";

const DetailArticle = () => {

  const [article, setArticles] = useState({});
  const [tailles, setTailles] = useState([])
  const [articleStock, setArticleStock] = useState([])

  const [valueTaille, setValueTaille] = useState(0);
  
  const {id} = useParams();

  useEffect( ()=>{
    const fetchArticles  = async ()=> {
        const {data} = await axios.get(`/api/articles/${id}`);
        setArticles(data.article)
        setTailles(data.tailles)
        setArticleStock(data.articleStock)
    }

    fetchArticles()
  },[id, valueTaille]);
  
  

  const selectedTaille = (event) => {
    const selectedValue = parseInt(event.target.value);
    setValueTaille(event.target.value)
    if (selectedValue === 0) {
        setValueTaille(0);
      }
    
  }

  const stockDispo = articleStock.filter((e )=> e.tailleId === parseInt(valueTaille))
  .map((e) => e.stock);

  
  
  
  
  return (
    <>
        <Link className="btn btn-light my-3" to="/">Retour</Link>
        <Row>
            <Col md={5} >
                <Image src={article.image} alt={article.nom} fluid />
            </Col>
            <Col md={4} >
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h3>{article.nom}</h3>
                    </ListGroup.Item>
                </ListGroup>
                <ListGroup.Item>
                       <p>{article.message}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                       Prix: {article.prix}€
                </ListGroup.Item>
            </Col>
            <Col md={3} >
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Prix: 
                                </Col>
                                <Col>
                                    <strong>{article.prix}€</strong> 
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        
                        {/* Taille article */}
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Taille: 
                                </Col>
                                <Col>
                                
                                <Form.Select aria-label="Default select example" onChange={selectedTaille}>
                                    <option  value={0}>aucune</option>
                                {tailles.map((taille, index)=>( 
                                    <option key={index} value={taille.id}>{taille.taille}</option>
                                ))}      
                                </Form.Select>
                                    
                                </Col>
                            </Row>
                        </ListGroup.Item>


                        <ListGroup.Item>
                            <Row>
                            
                                <Col>
                                    Status:
                                </Col>
                                <Col>
                                    {valueTaille ===0 && (
                                        <strong>"choisissez une taille"</strong>
                                    )}
                                    {valueTaille !==0 && stockDispo[0]>0 &&(
                                        <strong>disponible</strong>
                                    )}
                                    {valueTaille !==0 && stockDispo[0]<=0 &&(
                                        <strong>indisponible</strong>
                                    )}
                                  
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item> 
                           <Button className="btn-block" type="button" disabled={valueTaille === 0 || stockDispo[0]<=0}>
                                Ajouter au panier
                            </Button>
                            
                           
                        </ListGroup.Item>

                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default DetailArticle