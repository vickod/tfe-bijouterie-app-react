import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Button, Card, Dropdown} from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { supprimerDuPanier } from '../slices/panierSlice';


const Panier = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { articlesDuPanier } = useSelector((state) => state.panier);
  
  const supprimerArticle = (id,taille) => {
    dispatch(supprimerDuPanier({ id, taille}));
    window.location.reload()
  };

  const verificationCommande = () => {
    navigate("/login?redirect=/verification");
    window.location.reload()
  };

  return (
    <Row>
      <Col md={9}>
        <h1 style={{ marginBottom: "20px" }}>Panier</h1>
        {articlesDuPanier.length === 0 ? (
          <>
            <Message>Le panier est vide.</Message> <Link to="/">Revenir</Link>
          </>
        ) : (
          <ListGroup variant="flush">
            {articlesDuPanier.map((article, i) => (
              <ListGroup.Item key={`${article.id}-${article.taille}panier`}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={article.image}
                      alt={article.nom}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <Link to={`/articles/${article.id}`}>{article.nom}</Link>
                  </Col>
                  <Col md={1}>{article.prix}€</Col>
                  <Col md={2}>Taille:{article.taille}</Col>

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
                        Gravures: {article.gravures.filter((gravure) => gravure !== null && gravure !== "").length}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                      {article.gravures
    .filter((gravure) => gravure !== null && gravure !== "") // Exclure les chaînes vides et les valeurs null
    .map((gravure, index) => (
      <Dropdown.Item key={index}>{gravure}</Dropdown.Item>
    ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>

                  <Col md={1}>Qté:{article.qty}</Col>

                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={(id, taille) => supprimerArticle(article.id, article.taille)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={3}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Total (
                {articlesDuPanier.reduce((acc, item) => acc + item.qty, 0)})
                articles
              </h2>
              <Col>
               Prix HTVA: €{" "}
              {articlesDuPanier
                  .reduce((acc, item) => (acc + item.qty * item.prix)/1.21, 0)
                  .toFixed(2)}
              </Col>
              <Col>
               + TVA 21%: €{" "}
              {articlesDuPanier
                  .reduce((acc, item) => (acc + item.qty * item.prix)-(acc + item.qty * item.prix)/1.21, 0)
                  .toFixed(2)}
              </Col>
              
              <Col>
                <strong>Total: €{" "}
                {articlesDuPanier
                  .reduce((acc, item) => acc + item.qty * item.prix, 0)
                  .toFixed(2)}</strong>
              </Col>
            </ListGroup.Item>

            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={articlesDuPanier.length === 0}
                onClick={verificationCommande}
              >
                Proceder au payement
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default Panier