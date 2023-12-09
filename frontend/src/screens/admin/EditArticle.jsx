import { useState, useEffect } from "react"
import {Link, useNavigate, useParams} from 'react-router-dom'
import {Form, Button, ButtonGroup, DropdownButton, Dropdown, Col, Modal, Row} from 'react-bootstrap'
import Message from '../../components/Message';
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import {toast} from 'react-toastify'
import {useUpdateArticleMutation,  useUploadImagesArticlesMutation} from '../../slices/articlesApiSlice'
import {useGetDetailArticleQuery} from '../../slices/DetailArticleSlice'
import EditPierre from "./componentsEditArticle/EditPierre";
import EditPerle from "./componentsEditArticle/EditPerle";
import EditTaille from "./componentsEditArticle/EditTaille";
import EditStock from "./componentsEditArticle/EditStock";

const EditArticle = () => {
const {id: articleId} = useParams();
const [nom, setNom] = useState('');
const [type, setType] = useState('');
const [prix, setPrix] = useState(0);
const [message, setMessage] = useState('')
const [image, setImage] = useState('');
const [categorie, setCategorie] = useState("");
const [selection, setSelection] = useState(0);
const [matiere, setMatiere] = useState(0);
const [carats, setCarats] = useState(0); 


const matiereCtOr = ["925/22 ct","750/18 ct", "585/14 ct ", "375/9 ct"]
const {data, isLoading, refetch, error } = useGetDetailArticleQuery(articleId)
const [updateArticle, {isLoading: loadingUpdate}] = useUpdateArticleMutation();
const [uploadImagesArticles, {isLoading: loadingUpload}] = useUploadImagesArticlesMutation();
const navigate = useNavigate();

//console.log(data )
// console.log(data ? data.articlesAvecPierre.find(elem => elem.articleId === parseInt(articleId) )?.nbCarats :"")
// console.log(data ?(data.pierres.find(pierre => pierre.id === data.articlesAvecPierre.find(article => article.articleId === data.article.id)?.typeDePierreId)?.nom || "") : "")

useEffect(() => {
    if(data) {
        setNom(data.article.nom);
        setType(data.article.type);
        setPrix(data.article.prix);
        setImage(data.article.image);
        setMessage(data.article.message);
        setCategorie(data.categories.find(categorie => categorie.id === data.article.categorieId)?.nom || "" );
        setSelection(data.selections.find(selection => selection.id === data.article.selectionId)?.nom || "" );
        setMatiere(data.matieres.find(matiere => matiere.id === data.article.typeDeMatiereId)?.matiere || "" );
        setCarats(data.carats.find(carat => carat.id === data.article.nbCaratId)?.valeur || "" );

    }
},[data] )


const submitHandlerUpdateArticle = async (e) => {
    e.preventDefault();

    if(!nom) {
      toast.error("Veuillez definir un titre a l'article", {
        position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
        autoClose: 5000, // Ferme automatiquement après 5 secondes
        hideProgressBar: true, // Affiche la barre de progression
        closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
        pauseOnHover: true, // Met en pause le temps d'affichage en survolant
        draggable: true, // Permet de faire glisser le toast
        progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
    });

    }else if(!prix || prix<=0) {
      toast.error("Veuillez definir un prix a l'article", {
        position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
        autoClose: 5000, // Ferme automatiquement après 5 secondes
        hideProgressBar: true, // Affiche la barre de progression
        closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
        pauseOnHover: true, // Met en pause le temps d'affichage en survolant
        draggable: true, // Permet de faire glisser le toast
        progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
    });
    }else if(!categorie || !selection || !matiere || !carats || !type) {
      toast.error("Veuillez remplir tous les champs", {
        position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
        autoClose: 5000, // Ferme automatiquement après 5 secondes
        hideProgressBar: true, // Affiche la barre de progression
        closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
        pauseOnHover: true, // Met en pause le temps d'affichage en survolant
        draggable: true, // Permet de faire glisser le toast
        progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
    });
    }
    
    else {
      const updatedArticle = {
        id: articleId,
        nom,
        prix,
        type,
        message,
        image,
        categorie,
        selection,
        matiere,
        carats,
    }
    const result = await updateArticle(updatedArticle);
  
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
        navigate('/admin/articles_list') 
        window.location.reload()     
        // setTimeout(()=> {
         
        // },1000)
    }
    }
}

const uploadFileHandler = async(e) => {
  const formData = new FormData();
  formData.append('image', e.target.files[0]);
  try {
    const res = await uploadImagesArticles(formData).unwrap();
    // toast.success(res.message, {
    //         position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
    //         autoClose: 5000, // Ferme automatiquement après 5 secondes
    //         hideProgressBar: true, // Affiche la barre de progression
    //         closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
    //         pauseOnHover: true, // Met en pause le temps d'affichage en survolant
    //         draggable: true, // Permet de faire glisser le toast
    //         progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
    //     });
        setImage(res.image);
  } catch (err) {  
    toast.error(err?.data?.message || err.error, {
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


  
  return (
    <>
      <Link to="/admin/articles_list" className="btn btn-light my-3">
        Retourner
      </Link>
      <FormContainer>
        <h1>Mise a jour de l'article</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Row >

              {/* EDIT BASE */}
              <Col className="col-12">
                <Form onSubmit={submitHandlerUpdateArticle}>
              
                  <Form.Group controlId="nom">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="nom"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="type">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="type: (ex: chevaliere, clous d'oreilles, chainette) "
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="prix">
                    <Form.Label>Prix</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="prix"
                      value={prix}
                      onChange={(e) => setPrix(e.target.value)}
                      min="1"
                    />
                  </Form.Group>

                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="description"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="image">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="image"
                        value={image}
                        onChange={(e)=>setImage(e.target.value)}
                        disabled
                        />
                        <Form.Control type='file' lablel='Importez une image' onChange={uploadFileHandler}>

                        </Form.Control>
                    </Form.Group>
                  
                  <Form.Group controlId="categorie">
                    <Form.Label>Categorie</Form.Label>
                    <Row>    
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder="choisissez une categorie"
                          value={categorie}
                          disabled
                        />
                      </Col>
                      <Col>
                        <Form.Select
                          aria-label=""
                          onChange={(e) => setCategorie(e.target.value)}
                        >
                          <option defaultValue=""></option>
                          {data.categories.map((categorie) => (
                            <option value={categorie.nom} key={categorie.id}>
                              {categorie.nom}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                  </Form.Group>

                  <Form.Group controlId="selection">
                    <Form.Label>selection</Form.Label>
                    <Row>
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder="choisissez une selection"
                          value={selection}
                          disabled
                        />
                      </Col>

                      <Col>
                        <Form.Select
                          aria-label=""
                          onChange={(e) => setSelection(e.target.value)}
                        >
                          <option defaultValue=""></option>
                          {data.selections.map((selection) => (
                            <option value={selection.nom} key={selection.id}>
                              {selection.nom}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                  </Form.Group>

                  <Form.Group controlId="matiere">
                    <Form.Label>matiere</Form.Label>
                    <Row>
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder="choisissez une matiere"
                          value={matiere}
                          disabled
                        />
                      </Col>

                      <Col>
                        <Form.Select
                          aria-label=""
                          onChange={(e) => setMatiere(e.target.value)}
                        >
                          <option defaultValue=""></option>
                          {data.matieres.map((matiere) => (
                            <option value={matiere.matiere} key={matiere.id}>
                              {matiere.matiere}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                  </Form.Group>

                  <Form.Group controlId="carat">
                    <Form.Label>carats-matiere</Form.Label>
                    <Row>
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder="definissez le nombre de carats"
                          value={carats}
                          disabled
                        />
                      </Col>

                      <Col>
                        <Form.Select
                          aria-label=""
                          onChange={(e) => setCarats(e.target.value)}
                        >
                          <option defaultValue=""></option>
                          {matiereCtOr.map((carat, index) => (
                            <option value={carat} key={index}>
                              {carat}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                  </Form.Group>
                  <Button type="submit" variant="primary" className="my-2">
                    Mettre a jour l'article
                  </Button>
                </Form>
            </Col>
            {/* EDIT BASE */}  

            </Row>
          </>
        )}
      </FormContainer>

    <br></br>
    <br></br>

    <Row>
     <Col className="col-12 text-center">
    
    <EditPierre articleId={articleId} />
    <EditPerle articleId={articleId} />
    <EditTaille categorie={categorie} articleId={articleId} />
    <EditStock articleId={articleId} />
   


    </Col>
    </Row>

    </>
  );
}

export default EditArticle

