import { useState, useEffect } from "react"
import {Table, Form, Button, Row, Col,} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import {toast} from 'react-toastify';
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetMesCommandesQuery } from "../../slices/commandesApiSlice";
import {FaTimes} from 'react-icons/fa'


const MesCommandes = () => {
    const {data: commandes, isLoading, error} = useGetMesCommandesQuery();

    console.log("test")

  return (
    <>
        <Col md={12}>
        <h2>Mes commandes</h2>
        {isLoading ?( <Loader /> ) : error ? (<Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>) : (
          <Table striped hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>#Id</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Payé</th>
                  <th>Livré</th>
                </tr>
              </thead>
              <tbody>
                {commandes.map((commande)=>(
                  <tr key={commande.id}>
                    <td>{commande.id}</td>
                    <td>{commande.createdAt? commande.createdAt.substring(0, 10):""}</td>
                    <td>{commande.total}€</td>
                    <td>
                    {commande.isPaid ? (commande.paidAt ? commande.paidAt.substring(0, 10) : "") : <FaTimes style={{ color: 'red' }} />}
                      </td>

                      <td>
                    {commande.isDelivered ? (
                      commande.isDelivered ? (commande.deliveredAt ? commande.deliveredAt.substring(0, 10) : "") : <FaTimes style={{ color: 'red' }} />
                      ) : (
                        <FaTimes style={{color: 'red'}}/>
                      )}
                      </td>
                      <td>
                        <LinkContainer to={`/commandes/${commande.id}`}>
                           <Button className="btn-sm" variant="light">
                            Detail
                           </Button>
                        </LinkContainer>
                      </td>
                  </tr>
                ))}
              </tbody>
          </Table>
        ) }
      </Col>
    </>
  )
}

export default MesCommandes