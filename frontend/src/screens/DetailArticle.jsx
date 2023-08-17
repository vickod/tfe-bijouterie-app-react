import {useParams } from "react-router-dom";
import {useState, useEffect} from "react"
import { Link } from "react-router-dom";
import {Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap';
import axios from "axios";

const DetailArticle = () => {

  const [article, setArticles] = useState({});
  const {id} = useParams();


  useEffect( ()=>{
    const fetchArticles  = async ()=> {
        const {data} = await axios.get(`/api/articles/${id}`);
        setArticles(data)
    }
    fetchArticles()
  },);




 
  
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
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Status: 
                                </Col>
                                <Col>
                                 {/*   <strong>{article.countInStock > 0 ? 'Disponible':' Indisponible'}</strong>*/} 
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item> 
                           {/* <Button className="btn-block" type="button" disabled={article.countInStock === 0}>
                                Ajouter au panier
                            </Button>
                            */}
                        </ListGroup.Item>

                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default DetailArticle