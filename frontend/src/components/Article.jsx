import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const Article = ({article}) => {
  return (
    <Card className='my-3 p-3 rounded'>
    <Link to={`/articles/${article.id}`}>
        <Card.Img src={article.image} variant='top'/>
    </Link>
    <Card.Body>
        <Link to= {`/articles/${article.id}`}>
            <Card.Title as="div">
                <strong>{article.nom}</strong>
            </Card.Title>
        </Link>
        <Card.Text as="h3">
            {article.prix}
        </Card.Text>   
    </Card.Body>
    Article</Card>
  )
}

export default Article