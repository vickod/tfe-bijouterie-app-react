import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {Table, Button, Row, Col} from 'react-bootstrap'
import {FaTimes, FaEdit, FaTrash, FaExclamationTriangle} from 'react-icons/fa'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { useGetArticlesQuery, useCreateArticleMutation, useDeleteArticleMutation } from '../../slices/articlesApiSlice'
import {toast} from 'react-toastify'


const ArticlesList = () => {
    const {data, isLoading, error, refetch} = useGetArticlesQuery();
    const [createArticle, {isLoading: loadingCreate}] = useCreateArticleMutation();
    const [deleteArticle, {isLoading: loadingDelete}] = useDeleteArticleMutation();

const deleteHandler = async (id) => {
    if(window.confirm('etes vous sûr de vouloir supprimer ?')) {
        try {
            await deleteArticle(id)
            refetch()
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }
}

const createArticleHandler = async () => {
    if(window.confirm('etes vous sure de vouloir creer un article?')) {
        try {

            await createArticle();
            refetch()
        } catch (err) {
            toast.error(err?.data?.message || err.message, {
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
}
// const stock = data? data.articlesTailles.filter(article => article.stock<5) : ""
// console.log(stock)
    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Articles</h1>
                </Col>
                <Col className='text-end'>
                {/* <LinkContainer to={`/admin/articles/add`}>
                    <Button variant='dark' className='btn-sm m-3'>
                        <FaEdit /> ajouter un article
                    </Button>
                </LinkContainer> */}
                    <Button className='btn-sm m-3' onClick={createArticleHandler}>
                        <FaEdit /> ajouter un article
                    </Button>
                </Col>
            </Row>
            {loadingCreate && <Loader />}
            {loadingDelete && <Loader />}
            {isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                    <Table striped hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>#id</th>
                                <th>nom</th>
                                <th>prix</th>
                                <th>categorie</th>
                                <th>selection</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.articles.map((article) => (
                                <tr key={article.id}>
                                    <td>{article.id}</td>
                                    <td>{article.nom}{ data && data.articlesTailles.find(item => item.stock===0 && item.articleId === article.id) ? (
                                        <strong style={{color: 'red'}}>{" "}<FaExclamationTriangle /></strong>
                                    ):data && data.articlesTailles.find(item => item.stock<5 && item.stock>0 && item.articleId === article.id) ? (
                                        <strong style={{color: 'orange'}}>{" "}<FaExclamationTriangle /></strong>
                                    ):"" }</td>
                                    <td>{article.prix}€</td>
                                    {data.categories.map((categorie, index) => (
                                        categorie.id === article.categorieId  && (
                                            <td key={index}>{categorie.nom}</td>
                                        )
                                    ))} 
                                    {data.selections.map((selection, index) => (
                                        selection.id === article.selectionId  && (
                                            <td key={index}>{selection.nom}</td>
                                        )
                                    ))} 
                                    <td>
                                        <LinkContainer to={`/admin/articles/${article.id}/edit`}>
                                            <Button variant='light' className='btn-sm mx-2'>
                                                <FaEdit />
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(article.id)}>
                                            <FaTrash style={{color: 'white'}}/>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        </>
    )
}

export default ArticlesList

