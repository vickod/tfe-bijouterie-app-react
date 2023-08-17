import {useEffect, useState} from 'react';
import {Row, Col} from 'react-bootstrap';
import Article from '../components/Article';
import axios from 'axios'

const Articles = () => {

  const [articles, setArticles] = useState([])

  useEffect(() => {
    const fetchArticles = async () => {
      const {data} = await axios.get('/api/articles');
      setArticles(data);
      console.log(data)
    };
    fetchArticles();
  }, [])

  return (
    <div>
        <h1>Tous les Articles</h1>
        <Row>
        {articles.map((elem) => (
                <Col key={elem.id} sm={12} md={6} lg={4} xl={3}>
                   <Article article={elem} />
                </Col>
            ))}
        </Row>
    </div>
  )
}

export default Articles