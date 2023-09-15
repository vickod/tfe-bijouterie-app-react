import {useEffect, useState} from 'react';
import {Row, Col} from 'react-bootstrap';
import Article from '../components/Article';
import { useGetArticlesQuery } from '../slices/articlesApiSlice';


const Articles = () => {
  const { data, isLoading, isError } = useGetArticlesQuery();
  const [articles, setArticles] = useState([]);

  console.log(data);

  return (
    <>
      {isLoading ? (
        <h2>Is loading...</h2>
      ) : isError ? (
        <div>{isError?.data?.message || isError.error}</div>
      ) : (
        <>
          <h1>Tous les Articles</h1>
          <Row>
            {data.articles.map((elem) => (
              <Col key={elem.id} sm={12} md={6} lg={4} xl={3}>
                <Article article={elem} />
              </Col>
            ))}
          </Row>
        </>
      )}

      <div className="paginationDiv"></div>
    </>
  );
}

export default Articles