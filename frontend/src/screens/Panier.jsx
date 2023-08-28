import React from 'react'
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'


const Panier = () => {
    const navigate = useNavigate()

  const [articlesPanier, setArticlesPanier] = useState([]);

  useEffect(() => {
    const panierStorage = JSON.parse(localStorage.getItem('panier')) || [];
    setArticlesPanier(panierStorage);
  }, []);


  const gravuresNonNulles = articlesPanier.length > 0
  ? articlesPanier
      .map((article) => article.gravure)
      .flat()
      .filter((gravure) => gravure !== null)
  : [];


  const deleteArticlePanier = (id) => {
    let panier = JSON.parse(localStorage.getItem('panier')) || [];

    panier = panier.filter((article) => article.id !== id);

    localStorage.setItem('panier', JSON.stringify(panier));
    // maj de l'état local pour refléter le panier mis à jour
    setArticlesPanier(panier);
  };


  const verifierSession = ()=>{
    navigate(`/login?redirect=/achat`)
  }


  return (
    <Row>
        <Col md={8}>
            <h1 style={{marginBottom:'20px'}}>Panier</h1>
            {articlesPanier.length === 0 ? (
                <>
                <h2>Panier vide...</h2> <Link to="/">Revenir</Link>
                </>
            ): (
                <ListGroup variant='flush'> 
                        {articlesPanier.map((article)=>(
                            <ListGroup.Item key={`${article.id}-${article.taille.taille}`}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={article.image} alt={article.nom} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/articles/${article.id}`}>{article.nom}</Link>
                                    </Col>
                                    <Col md={2}>
                                        {article.prix}€
                                    </Col>
                                    <Col md={2}>
                                        Taille:{article.taille.taille}
                                    </Col>
                                    {article.redFlag === true ? (
                                        <Col md={2} >
                                        Quantité:<strong style={{color:"red"}}>{article.qty}</strong>
                                        </Col>
                                    ):
                                    <Col md={2}>
                                        Quantité:{article.qty}
                                    </Col>
                                    }
                                    
                                    <Col md={1}>
                                        <Button type='button' variant='light' onClick={() => deleteArticlePanier(article.id)}>
                                            <FaTrash />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                </ListGroup>   
            )}  
        </Col>
        <Col md={4}>
        <Card>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>
                        Total ({articlesPanier.reduce((acc, item)=> acc+item.qty, 0)}) articles
                    </h2>
                    <Col>
                        + Gravures gratuites: {gravuresNonNulles.length}
                    </Col>
                    <Col>
                    € {articlesPanier.reduce((acc, item)=> acc+item.qty*item.prix,0).toFixed(2)}
                    </Col>       
                </ListGroup.Item>

                <ListGroup.Item>
                    <Button type='button' className='btn-block' 
                    disabled={articlesPanier.length === 0}
                    onClick={verifierSession}
                    >
                        Proceder au payement
                    </Button>
                </ListGroup.Item>

            </ListGroup>
        </Card>
    </Col>
    </Row>
   
  )
}

export default Panier