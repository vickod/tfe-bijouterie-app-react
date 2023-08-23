import React from 'react'
import { Form, Accordion } from 'react-bootstrap'

const SortFilter = ({setValueSort}) => {

  const getSelectedSort = (event) => {
    setValueSort(event.target.value);
  };
  
  return (
    <>
      <Accordion.Item eventKey="6">
        <Accordion.Header>Trier par:</Accordion.Header>
        <Accordion.Body>
         
          <Form.Select aria-label="Default select example" onChange={getSelectedSort}>
            <option value="aucun">aucun</option>
            <option value="croissant" >prix croissant</option>
            <option value="decroissant">prix decroissant</option>
          </Form.Select>
        </Accordion.Body>
      </Accordion.Item>
    </>
  );
}

export default SortFilter