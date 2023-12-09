import {useEffect, useState} from 'react';
import {Row, Col} from 'react-bootstrap';
import Article from '../components/Article';
import axios from 'axios'
import GlobalFilter from '../components/Filter/GlobalFilter';
import Pagination from '../components/PaginationItems';
const Articles = () => {
  //---------------------------STATES--------------------------------
  //data states
  const [articles, setArticles] = useState([]);

  // PUSH DATA ON FILTER
  const [categories, setCategories] = useState([]);
  const [typeDePierres, setTypeDePierres] = useState([]);
  const [typeDePerles, setTypeDePerles] = useState([]);
  const [matieres, setMatieres] = useState([])

// GET VALUES OF SELECTED FILTER OPTIONS
  const [valueSelectionId, setValueSelectionId] = useState("0");
  const [valueCategorie, setValueCategorie] = useState('tous');
  const [valueMatieres, setValueMatieres] = useState('tous');
  const [valueCarats, setValueCarats] = useState('tous')
  const [valuePierres, setValuePierres] = useState("0")
  const [valuePerles, setValuePerles] = useState("0")
  const [valueSort, setValueSort] = useState("aucun")
  
      
  //pagination
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  //Pagination: Réinitialise currentPage à 1 lorsque l'un des filtres change
  useEffect(() => {
    setCurrentPage(1); 
  }, [valueSelectionId, valueCategorie, valueMatieres, valueCarats, valuePierres, valuePerles, valueSort]);
  
  //get data to backend
  useEffect(() => {
    const fetchArticles = async () => {
      const {data} = await axios.get(
        `/api/articles?selection=${valueSelectionId}&categorie=${valueCategorie}&matiere=${valueMatieres}&carats=${valueCarats}&pierre=${valuePierres}&perle=${valuePerles}&sort=${valueSort}`
        );  
      setCategories(data.categories);
      setTypeDePierres(data.typeDePierres);
      setTypeDePerles(data.typeDePerles)
      setMatieres(data.matieres)
      setArticles(data.articles);
      setLoading(false)   
    };
    fetchArticles();
  },[
    valueSelectionId, 
    valueCategorie, 
    valueMatieres, 
    valueCarats, 
    valuePierres,
    valuePerles, 
    valueSort
  ])

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = articles.slice(indexOfFirstItem,indexOfLastItem);

  //change Page
  const paginate = pageNumber => setCurrentPage(pageNumber)

  // if(loading){
  //   return <h2>Chargement...</h2>
  // }
 
  return (
    <div>
      {/* <h1>Tous les Articles</h1> */}
      <Row>
        <Col xl={3} lg={4} md={6} sm={12}>
          
          <GlobalFilter 
          //PUSH DATA ON FILTER
          articles={articles}
          categories={categories}
          matieres={matieres}
          typeDePierres={typeDePierres}
          typeDePerles={typeDePerles}

          //GET VALUE OF SELECTED FILTER OPTIONS
          setValueSelectionId={setValueSelectionId}
          setValueCategorie={setValueCategorie}
          setValueMatieres={setValueMatieres}
          setValueCarats={setValueCarats}
          setValuePierres={setValuePierres}
          setValuePerles={setValuePerles}
          setValueSort={setValueSort}
          />
        </Col>
     
        {currentItems.map((elem) => (
          <Col key={elem.id} sm={12} md={6} lg={4} xl={3}>
            <Article article={elem}  />
          </Col>
        ))}
      </Row>
      <div className='paginationDiv'>
        <Pagination 
        itemsPerPage={itemsPerPage} 
        totalItems={articles.length} 
        paginate={paginate}
        currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default Articles