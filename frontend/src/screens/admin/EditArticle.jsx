import { useState, useEffect } from "react"
import {Link, useNavigate, useParams} from 'react-router-dom'
import {Form, Button, ButtonGroup, DropdownButton, Dropdown, Col, Row} from 'react-bootstrap'
import Message from '../../components/Message';
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import {toast} from 'react-toastify'
import {useUpdateArticleMutation, 
  useAjoutDeTailleMutation, 
  useSuppressionTailleMutation, 
  useModifStockMutation,
  useUploadImagesArticlesMutation,

} from '../../slices/articlesApiSlice'
import {useGetDetailArticleQuery} from '../../slices/DetailArticleSlice'


const EditArticle = () => {
const {id: articleId} = useParams();
const [nom, setNom] = useState('');
const [prix, setPrix] = useState(0);
const [message, setMessage] = useState('')
const [image, setImage] = useState('');
const [categorie, setCategorie] = useState("");
const [selection, setSelection] = useState(0);
const [matiere, setMatiere] = useState(0);
const [carats, setCarats] = useState(0); 


const [addTaille, setAddTaille] = useState(0)
const [tailleId, setTailleId] = useState(0);

const [supprimerTaille, setSupprimerTaille] = useState(0);
const [stock, setStock] = useState(0);
const [stockDisponible, setStockDisponible] = useState("");

// ARTICLES GUIDE DE TAILLE
const [mesure, setMesure] = useState(0);
const [poids, setPoids] = useState(0);
const [diametre, setDiametre] = useState(0);
const [longeur, setLongeur] = useState(0)
const [largeur, setLargeur] = useState(0)
const [epaisseur, setEpaisseur] = useState(0)

//ARTICLES AVEC PIERRES
const [typeDePierre, setTypeDePierre] = useState("");
const [nbPierres, setNbPierres] = useState(0);
const [couleurPierre, setCouleurPierre] = useState(0);
const [nbCtPierres, setNbCtPierres] = useState(0);


//ARTICLES AVEC PERLES
const [typeDePerle, setTypeDePerle] = useState("");
const [nbPerles, setNbPerles] = useState(0);
const [couleurPerle, setCouleurPerle] = useState(0);

// bagues colliers boucles d'oreilles
const [typeDeBague, setTypeDeBague] = useState("");
const [typeDeBouclesDoreilles, setTypeDeBouclesDoreilles] = useState("")
const [typeDeFermetureCollier, setTypeDeFermetureCollier] = useState("")

const matiereCtOr = ["925/22 ct","750/18 ct", "585/14 ct ", "375/9 ct"]
const {data, isLoading, refetch, error } = useGetDetailArticleQuery(articleId)
const [updateArticle, {isLoading: loadingUpdate}] = useUpdateArticleMutation();
const [ajoutDeTaille] = useAjoutDeTailleMutation();
const [suppressionTaille] = useSuppressionTailleMutation();
const [modifStock] = useModifStockMutation();
const [uploadImagesArticles, {isLoading: loadingUpload}] = useUploadImagesArticlesMutation();
const navigate = useNavigate();



useEffect(() => {
    if(data) {
        setNom(data.article.nom);
        setPrix(data.article.prix);
        setImage(data.article.image);
        setMessage(data.article.message);
        setCategorie(data.categories.find(categorie => categorie.id === data.article.categorieId)?.nom || "" );
        setSelection(data.selections.find(selection => selection.id === data.article.selectionId)?.nom || "" );
        setMatiere(data.matieres.find(matiere => matiere.id === data.article.typeDeMatiereId)?.matiere || "" );
        setCarats(data.carats.find(carat => carat.id === data.article.nbCaratId)?.valeur || "" );
        setTypeDePierre(data.pierres.find(pierre => pierre.id === data.articlesAvecPierre.find(article => article.id === data.article.id)?.typeDePierreId)?.nom || "")
        setNbPierres(data.articlesAvecPierre.find(article => article.articleId === data.article.id)?.nbPierres || "")
        setCouleurPierre(data.couleurs.find(couleur => couleur.id === data.articlesAvecPierre.find(article => article.articleId === data.article.id)?.couleurId)?.nom  || "")     
        setTypeDePerle(data.perles.find(perle => perle.id === data.articlesAvecPerle.find(elem => elem.articleId === data.article.id)?.typeDePerleId)?.type || "")
        setNbPerles(data.articlesAvecPerle.find(article => article.articleId === data.article.id)?.nbPerles || "")
        setCouleurPerle(data.couleurs.find(couleur => couleur.id === data.articlesAvecPerle.find(article => article.articleId === data.article.id)?.couleurId)?.nom  || "")   
    }
},[data] )


const submitHandler = async (e) => {
    e.preventDefault();
    const updatedArticle = {
        id: articleId,
        nom,
        prix,
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
        console.log("erreur")
    }else {
        // toast.success("l'article a été mis a jour ", {
        //     position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
        //     autoClose: 5000, // Ferme automatiquement après 5 secondes
        //     hideProgressBar: true, // Affiche la barre de progression
        //     closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
        //     pauseOnHover: true, // Met en pause le temps d'affichage en survolant
        //     draggable: true, // Permet de faire glisser le toast
        //     progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
        // });
        navigate('/admin/articles_list')
        window.location.reload()


    }
}


const submitTailleHandler = async (e) => {
    e.preventDefault();
    const updatedArticleTaille = {
        id: articleId,
        addTaille,
        tailleId,
        poids,
        diametre,
        longeur,
        largeur,
        epaisseur, 
    }
    const result = await ajoutDeTaille(updatedArticleTaille);
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
        console.log("erreur")
    }else {
        // toast.success("l'article a été mis a jour ", {
        //     position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
        //     autoClose: 5000, // Ferme automatiquement après 5 secondes
        //     hideProgressBar: true, // Affiche la barre de progression
        //     closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
        //     pauseOnHover: true, // Met en pause le temps d'affichage en survolant
        //     draggable: true, // Permet de faire glisser le toast
        //     progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
        // });
        navigate('/admin/articles_list')
        window.location.reload()
    }
}




const deleteTailleHandler = async (e) => {
    e.preventDefault();
    const updatedArticleTaille = {
        id: articleId,
        supprimerTaille, 
    }
    const result = await suppressionTaille(updatedArticleTaille);
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
        console.log("erreur")
    }else {
        // toast.success("l'article a été mis a jour ", {
        //     position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
        //     autoClose: 5000, // Ferme automatiquement après 5 secondes
        //     hideProgressBar: true, // Affiche la barre de progression
        //     closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
        //     pauseOnHover: true, // Met en pause le temps d'affichage en survolant
        //     draggable: true, // Permet de faire glisser le toast
        //     progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
        // });
        navigate('/admin/articles_list')
        window.location.reload()
    }
}


const modifierStockHandler = async (e) => {
    e.preventDefault();
    const updatedArticleTaille = {
        id: articleId,
        tailleId,
        stock, 
    }
    const result = await modifStock(updatedArticleTaille);
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
        console.log("erreur")
    }else {
        // toast.success("l'article a été mis a jour ", {
        //     position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
        //     autoClose: 5000, // Ferme automatiquement après 5 secondes
        //     hideProgressBar: true, // Affiche la barre de progression
        //     closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
        //     pauseOnHover: true, // Met en pause le temps d'affichage en survolant
        //     draggable: true, // Permet de faire glisser le toast
        //     progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
        // });
        navigate('/admin/articles_list')
        window.location.reload()
    }
}

const  ajoutPierresHandler = async(e) => {

}

const  ajouterPerlesHandler = async(e) => {

}

const uploadFileHandler = async(e) => {
  const formData = new FormData();
  formData.append('image', e.target.files[0]);
  try {
    const res = await uploadImagesArticles(formData).unwrap();
    toast.success(res.message, {
            position: toast.POSITION.TOP_CENTER, // Placement en haut à droite
            autoClose: 5000, // Ferme automatiquement après 5 secondes
            hideProgressBar: true, // Affiche la barre de progression
            closeOnClick: true, // Ferme le toast lorsqu'on clique dessus
            pauseOnHover: true, // Met en pause le temps d'affichage en survolant
            draggable: true, // Permet de faire glisser le toast
            progress: undefined, // Peut être utilisé pour définir une valeur de progression personnalisée
        });
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
                <Form onSubmit={submitHandler}>
                <br></br>
                <h3 style={{color: 'red'}}>Ajouter/Modifier un article</h3>
                  <Form.Group controlId="nom">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="nom"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
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

                           

              {/* AJOUTER TAILLE */}  
              <Col className="col-12">
                <Form onSubmit={submitTailleHandler}>
                <br></br>
                <h3 style={{color: 'red'}}>Ajouter une taille</h3>
                  <Form.Group controlId="taille">
                    <Form.Label><strong>Taille</strong></Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="taille"
                      value={addTaille}
                      onChange={(e) => setAddTaille(e.target.value)}
                      min="0"
                    />
                  </Form.Group>

                  <Form.Group controlId="poids">
                    <Form.Label>Poids (g)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="poids"
                      value={poids}
                      onChange={(e) => setPoids(e.target.value)}
                      min="0"
                    />
                  </Form.Group>

                  <Form.Group controlId="diametre">
                    <Form.Label>Diametre (mm)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="diametre"
                      value={diametre}
                      onChange={(e) => setDiametre(e.target.value)}
                      min="0"
                    />
                  </Form.Group>

                  <Form.Group controlId="longeur">
                    <Form.Label>Longeur (mm)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="longeur"
                      value={longeur}
                      onChange={(e) => setLongeur(e.target.value)}
                      min="0"
                    />
                  </Form.Group>

                  <Form.Group controlId="largeur">
                    <Form.Label>Largeur (mm)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="largeur"
                      value={largeur}
                      onChange={(e) => setLargeur(e.target.value)}
                      min="0"
                    />
                  </Form.Group>

                  <Form.Group controlId="epaisseur">
                    <Form.Label>Epaisseur (mm)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="epaisseur"
                      value={epaisseur}
                      onChange={(e) => setEpaisseur(e.target.value)}
                      min="0"
                    />
                  </Form.Group>

                  <Button type="submit" variant="primary" className="my-2">
                    Ajouter une taille
                  </Button>
                </Form>



                {/* SUPPRIMER TAILLE */}
                <Form onSubmit={deleteTailleHandler}>
                    <Row>
                      <Col>
                      <br></br>
                      <h3 style={{color: 'red'}}>Supprimer une taille</h3>
                        <Form.Select
                          aria-label=""
                          onChange={(e) => {
                            setSupprimerTaille(e.target.value);
                          }}
                        >
                          <option value={0}>
                            selectionner une taille a supprimer
                          </option>
                          {data.tailles.map((taille, index) => (
                            <option value={taille.id} key={taille.id}>
                              {taille.taille}
                            </option>
                          ))}
                        </Form.Select>

                        <Button
                          type="submit"
                          variant="primary"
                          className="my-2"
                        >
                          Supprimer la taille
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                 {/* END SUPPRIMER TAILLE */}



                </Col>
                {/* END AJOUTER TAILLE */}    
               

                 
                
                 


                <Col className="col-12">

                 {/* MODIFIER STOCk TAILLE */} 
                <Form onSubmit={modifierStockHandler}>
                <br></br>
                <h3 style={{color: 'red'}}>Modifier le stock</h3>
                  <Form.Group controlId="stock">
                    <Form.Label>Stock disponible</Form.Label>
                    <Row>
                      <Col>
                        <Form.Control
                          type="number"
                          placeholder="selectionnez une taille"
                          value={stockDisponible}
                          //onChange={(e) => setStock(e.target.value)}
                          disabled
                        />
                      </Col>

                      <Col>
                        <Form.Select
                          aria-label=""
                          onChange={(e) => {
                            setTailleId(e.target.value);
                            const stockPourTaille = data.articleStock.find(elem => elem.tailleId === parseInt(e.target.value))?.stock;
                            setStockDisponible(stockPourTaille || 0); // Mettez à jour l'état du stock disponible
                            }}
                        >
                          <option value={0}>choisissez la taille</option>
                          {data.tailles.map((taille, index) => (
                            <option value={taille.id} key={index}>
                              {taille.taille}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                            <br></br>
                    <Col>
                        <Form.Control
                          type="number"
                          placeholder="modifier le stock"
                          value={stock}
                          onChange={(e) => setStock(e.target.value)}
                          min="0"
                        />
                      </Col>

                  </Form.Group>

                  <Button type="submit" variant="primary" className="my-2">
                    Mettre a jour le stock
                  </Button>
                </Form>
                {/* END MODIFIER STOCk TAILLE */}  

                </Col>
                 {/* end SUPPRIMER TAILLE */}    

                {/* MODIFIER STOCk TAILLE */} 
               






















            {/* AJOUTER PIERRES */}  
              <Col className="col-12">
                <Form onSubmit={ajoutPierresHandler}>
                <br></br>
                <h3 style={{color: 'red'}}>Article avec pierre ?</h3>
                <Form.Group controlId="pierre">
                    <Form.Label>Type de pierre</Form.Label>
                    <Row>    
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder="choisissez un type de pierre"
                          value={typeDePierre}
                          disabled
                        />
                      </Col>
                      <Col>
                        <Form.Select
                          aria-label=""
                          onChange={(e) => setTypeDePierre(e.target.value)}
                        >
                          <option defaultValue=""></option>
                          {data.pierres.map((pierre) => (
                            <option value={pierre.nom} key={pierre.id}>
                              {pierre.nom}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                  </Form.Group>

                  <Form.Group controlId="nbPierres">
                    <Form.Label>Nombre de pierres</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="nombre de pierres"
                      value={nbPierres}
                      onChange={(e) => setNbPierres(e.target.value)}
                      min="0"
                    />   
                  </Form.Group>

                  <Form.Group controlId="couleur">
                    <Form.Label>Couleur pierre</Form.Label>
                    <Row>    
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder="choisissez une couleur"
                          value={couleurPierre}
                          disabled
                        />
                      </Col>
                      <Col>
                        <Form.Select
                          aria-label=""
                          onChange={(e) => setCouleurPierre(e.target.value)}
                        >
                          <option defaultValue=""></option>
                          {data.couleurs.map((couleur) => (
                            <option value={couleur.nom} key={couleur.id}>
                              {couleur.nom}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                  </Form.Group>

                  <Form.Group controlId="nombres de carats">
                    <Form.Label>Nombre de carats</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="nombre de carats"
                      value={nbCtPierres}
                      onChange={(e) => setNbCtPierres(e.target.value)}
                      min="0"
                    />   
                  </Form.Group>
                  <Button type="submit" variant="primary" className="my-2">
                   Associer cette pierre a l'article
                  </Button>
                </Form>
                </Col>
                {/* END AJOUTER TAILLE */}    
               






              {/* AJOUTER PERLE */}  
              <Col className="col-12">
                <Form onSubmit={ajouterPerlesHandler}>
                <br></br>
                <h3 style={{color: 'red'}}>Article avec perle ?</h3>
                <Form.Group controlId="perle">
                    <Form.Label>Type de perle</Form.Label>
                    <Row>    
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder="choisissez un type de perle"
                          value={typeDePerle}
                          disabled
                        />
                      </Col>
                      <Col>
                        <Form.Select
                          aria-label=""
                          onChange={(e) => setTypeDePerle(e.target.value)}
                        >
                          <option defaultValue=""></option>
                          {data.perles.map((perle) => (
                            <option value={perle.type} key={perle.id}>
                              {perle.type}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                  </Form.Group>

                  <Form.Group controlId="nbPerles">
                    <Form.Label>Nombre de perles</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="nombre de perles"
                      value={nbPerles}
                      onChange={(e) => setNbPerles(e.target.value)}
                      min="0"
                    />   
                  </Form.Group>

                  <Form.Group controlId="couleur">
                    <Form.Label>Couleur perle</Form.Label>
                    <Row>    
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder="choisissez une couleur"
                          value={couleurPerle}
                          disabled
                        />
                      </Col>
                      <Col>
                        <Form.Select
                          aria-label=""
                          onChange={(e) => setCouleurPerle(e.target.value)}
                        >
                          <option defaultValue=""></option>
                          {data.couleurs.map((couleur) => (
                            <option value={couleur.nom} key={couleur.id}>
                              {couleur.nom}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                  </Form.Group>

                  <Button type="submit" variant="primary" className="my-2">
                   Associer cette perle a l'article
                  </Button>
                </Form>
                </Col>
                {/* END AJOUTER PERLE */}    





            </Row>
          </>
        )}
      </FormContainer>
    </>
  );
}

export default EditArticle