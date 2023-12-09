import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {Table, Button} from 'react-bootstrap'
import {FaTimes} from 'react-icons/fa'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { useGetCommandesQuery } from '../../slices/commandesApiSlice'


const CommandesList = () => {
  const {data, isLoading, error} = useGetCommandesQuery();
  
  
 

  return (
    <>
      <h1>Commandes</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Utilisateur</th>
              <th>Date</th>
              <th>Total</th>
              <th>Payé</th>
              <th>Livré</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.commandes.map((commande) => (
              <tr key={commande.id}>
                <td>{commande.id}</td>
                <td>
                  {
                    data.utilisateurs.find(
                      (utilisateur) => utilisateur.id === commande.utilisateurId
                    )?.nom
                  }{" "}
                  {data.utilisateurs.find(
                    (utilisateur) => utilisateur.id === commande.utilisateurId
                  )?.prenom || "Utilisateur inconnu"}
                </td>
                <td>
                {commande.createdAt
                ? new Date(commande.createdAt).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })
                : ''}
                </td>
                <td>
                  {commande.total}€
                </td>
                <td>
                {commande.isPaid ? (
                  new Date(commande.paidAt).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })
                ) : (
                  <FaTimes style={{color: 'red'}} />
                )}
                </td>
                <td>
                {commande.isDelivered ? (
                  new Date(commande.deliveredAt).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })
                ) : (
                  <FaTimes style={{color: 'red'}} />
                )}
                </td>
                  <td>
                  {commande && (
                    <LinkContainer to={`/commandes/${commande.id}`}>
                      <Button variant='light' className='btn-sm'>
                        Details
                      </Button>
                    </LinkContainer>
                  )}
                  </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default CommandesList