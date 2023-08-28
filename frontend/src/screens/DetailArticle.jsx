import {Link, useParams, useNavigate } from "react-router-dom";
import {useState, useEffect} from "react"
import {Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap';
import axios from "axios";


const DetailArticle = () => {
//states
  const [article, setArticles] = useState({});
  const [tailles, setTailles] = useState([])
  const [articleStock, setArticleStock] = useState([])
  const [valueTaille, setValueTaille] = useState(0);
  const [qty, setQty] = useState(1); //nb articles panier
  const [gravures, setGravures] = useState([]); //pour stocker les gravures
  const [tailleSelected, setTailleSelected] = useState(0);
  //const [inputStates, setInputStates] = useState(Array(qty).fill(false)); // État local pour activer ou désactiver chaque champ de gravure
// modules
  const {id} = useParams();
  const navigate = useNavigate();

//get db data (axios)
  useEffect( ()=>{
    const fetchArticles  = async ()=> {
        const {data} = await axios.get(`/api/articles/${id}`);
        setArticles(data.article)
        setTailles(data.tailles)
        setArticleStock(data.articleStock)
    }
    fetchArticles()
  },[id, valueTaille]);
  
//functions
  //select taille

  const selectedTaille = (event) => {
    const selectedValue = parseInt(event.target.value);
    setValueTaille(event.target.value)
    if (selectedValue === 0) {
        setValueTaille(0);
      }
    else {
        const taille = tailles.find((t) => t.id === selectedValue);
        setTailleSelected(taille); 
      } 
  }

  //select quantité
  const selectedQty = (e)=> {
    setQty(Number(e.target.value))
}
 // Fonction de mise à jour des gravures
 const getInputGravure = (index, value) => {
    const updatedGravures = [...gravures];
    updatedGravures[index] = value;
    //const a = updatedGravures.filter((gravure) => gravure !== null && gravure !== "");
    setGravures(updatedGravures);  

  };


// TRAITEMENT
  //stock disponnible de l'article 
  const stockDispo = articleStock.filter((e )=> 
  e.tailleId === parseInt(valueTaille))
  .map((e) => e.stock);
  //push gravure Component to jsx
  const nbGravures = [];
  for (let i = 0; i < qty; i++) {
    nbGravures.push(
      <ListGroup.Item key={`${article.id}-${i}`}>
        <Row>
          <Col>Gravure: {i+1}</Col>
          <Col>
            <Form.Control
              size="sm"
              type="text"
              placeholder="message"
              maxLength={10}
              onChange={(e) => getInputGravure(i, e.target.value.trim())}
            />
          </Col>
        </Row>
      </ListGroup.Item>
    );
  }



  

  
  
  
  

//LOCAL STORAGE  
  const ajouteAuPanier = () => {
    const montantTotal = article.prix * qty;
    //const taille = tailles.findIndex(valueTaille)
    //const gravuresFiltrees = gravures.filter((gravure) => gravure !== null && gravure !== "");
    const articleToAdd = {
      id: article.id,
      nom: article.nom,
      image: article.image,
      prix: article.prix,
      stock: stockDispo[0],
      selection: article.selectionId,
      categorie: article.categorieId,
      gravure: gravures,
      //nbGravure:
      tailleId: valueTaille,
      taille: tailleSelected,
      qty: qty,
      montantTotal,
      redFlag: false,
    };

    // on recupere le panier dans le storage s'il existe
    let panier = JSON.parse(localStorage.getItem("panier")) || [];

    // on verifie si l'article est deja dans le panier
    const articleExistant = panier.find(
      (item) => item.id === article.id && item.tailleId === valueTaille
    );

    if (articleExistant) {
      articleExistant.qty += qty;
      articleExistant.montantTotal += montantTotal;
      
      if(articleExistant.qty > articleExistant.stock){
        articleExistant.qty = articleExistant.stock
        articleExistant.redFlag = true
        alert(`vous avez atteint le nombre maximum disponible pour cet article.`);
      }
      if (gravures && articleExistant.gravure.length < articleExistant.stock && articleExistant.qty < articleExistant.stock) { 
        articleExistant.gravure = [...articleExistant.gravure, ...gravures]; 
    }
      
    } else {
      panier.push(articleToAdd);
    }
    //save updated panier dans le local storage
    localStorage.setItem("panier", JSON.stringify(panier));
    navigate("/panier");
  };
  

  
  
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

                         {stockDispo[0] > 0 && (
                            <>
                            <ListGroup.Item >
                                    <Row>
                                        <Col>Quantité:</Col>
                                        <Col>
                                            <Form.Control
                                            as='select'
                                            value = {qty}
                                            onChange={selectedQty}
                                            >
                                            {[...Array(stockDispo[0]).keys()]
                                            .map((x) => (
                                                <option key={x + 1} value={x+1}>
                                                    {x+1}
                                                </option>
                                            ))}
                                            </Form.Control>
                                        </Col>
                                    </Row>
                            </ListGroup.Item>

                            
                            

                            {nbGravures}


                           
                            </>
                         )}

                         

                        <ListGroup.Item> 
                           <Button className="btn-block" type="button" 
                           disabled={valueTaille === 0 || stockDispo[0]<=0}
                           onClick={ajouteAuPanier}
                           >
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