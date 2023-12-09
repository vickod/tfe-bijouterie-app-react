import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {Table, Button} from 'react-bootstrap'
import {FaTimes} from 'react-icons/fa'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { useGetCommandesLivreurQuery } from '../../slices/commandesApiSlice'


const Alivrer = () => {
  const {data, isLoading, error} = useGetCommandesLivreurQuery();
  


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
              <th>Telephone</th>
              <th>Adresse</th>
              <th>Commande créée le:</th>
              <th>livraison</th>
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
                    {data.utilisateurs.find(
                      (utilisateur) => utilisateur.id === commande.utilisateurId
                    )?.telephone}
                </td>
                <td>
                {data.utilisateurs.find(
                      (utilisateur) => utilisateur.id === commande.utilisateurId
                    )?.adresse}
                </td>
                <td>
                {commande.createdAt ? (
                  new Date(commande.createdAt).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })
                ) : (
                  <span>Pas de date disponible</span>
                )}
                </td>
                <td>
                {commande.isDelivered ? (
                  commande.deliveredAt.substring(0,10)
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

export default Alivrer