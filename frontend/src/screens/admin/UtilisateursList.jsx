import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {Table, Button} from 'react-bootstrap'
import {FaTimes, FaTrash, FaEdit, FaCheck} from 'react-icons/fa'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { useGetUtilisateursQuery, useDeleteUtilisateurMutation } from '../../slices/utilisateursSlice'
import {toast} from 'react-toastify'

const UtilisateursList = () => {
  const {data: utilisateurs, refetch, isLoading, error} = useGetUtilisateursQuery();
  const [deleteUtilisateur, {isLoading: loadingDelete}] = useDeleteUtilisateurMutation();

  
  const deleteHandler = async (id) => {
    if(window.confirm('etes vous sûr de vouloir supprimer?')) {
        try {
            await deleteUtilisateur(id)
            refetch()
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }
  }

//console.log(data ? data: "")

  return (
    <>
      <h1>Utilisateurs</h1>
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>email</th>
              <th>telephone</th>
              <th>adresse</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            {utilisateurs.map((utilisateur) => (
              <tr key={utilisateur.id}>
                <td>{utilisateur.id}</td>
                <th>{utilisateur.nom}{" "}{utilisateur.prenom}</th>
                <th><a href={`mailto:${utilisateur.email}`}>{utilisateur.email}</a></th>
                <th>{utilisateur.telephone}</th>
                <th>{utilisateur.adresse}</th>
                <td>
                {utilisateur.roleId === 2 ? (

                    <FaCheck style={{color: 'green'}} />
                ): (
                    <FaTimes style={{color: 'red'}} />
                )}
                </td>
                  <td>

                    <LinkContainer to={`/admin/utilisateurs/${utilisateur.id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(utilisateur.id)}>
                        <FaTrash  style={{color: 'white'}}/>
                    </Button>
                  </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}
export default UtilisateursList