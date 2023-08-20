import {useEffect, useState} from 'react';
import {Row, Col} from 'react-bootstrap';
import Article from '../components/Article';
import axios from 'axios'
import GlobalFilter from '../components/Filter/GlobalFilter';


const Articles = () => {
  //---------------------------STATES--------------------------------
  //data states
  const [articles, setArticles] = useState([]);

  //filter states
  const [selectionId, setSelectionId] = useState("0");
  const [categories, setCategories] = useState([]);
  const [bagues, setBagues] = useState([]);
  

    //---------------------------END OF STATES--------------------------------
  
  useEffect(() => {
    const fetchArticles = async () => {
      const {data} = await axios.get('/api/articles?selectionId=' +selectionId);
      setArticles(data.articles); 
      setCategories(data.categories);
      setBagues(data.bagues)
    };
    fetchArticles();
  },[selectionId])


 

  return (
    <div>
      <h1>Tous les Articles</h1>
      <Row>
       
        <Col xl={3} lg={4} md={6} sm={12}>
          
          <GlobalFilter 
          selectionId={selectionId} 
          setSelectionId={setSelectionId}
          articles={articles}
          categories={categories}
          bagues={bagues}
          
          />

        </Col>
        
        {articles.map((elem) => (
          <Col key={elem.id} sm={12} md={6} lg={4} xl={3}>
            <Article article={elem} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Articles