import React from 'react'
import { Accordion, Form } from "react-bootstrap";

const MatiereFilter = ({matieres, setValueMatieres}) => {

    const matieresOr = ["tous",...new Set(matieres.map(e => e.matiere))]
    
    
    const getSelectedMatiere = (event) => {
      setValueMatieres(event.target.value)
    };

  return (
    <>
      {/* FILTER SELECTION */}
      <Accordion.Item eventKey="2">
        <Accordion.Header>Matiere</Accordion.Header>
        <Accordion.Body>
          <Form>
            {["radio"].map((type) => (
              <div key={`default-${type}`} className="mb-3">
                {matieresOr.map((matiere, index) => (
                  <Form.Check // prettier-ignore
                    key={index}
                    name={`matiere`}
                    type={type}
                    id={`matiere${matiere}`}
                    label={matiere}
                    value={matiere}
                    defaultChecked={index === 0}
                    onChange={getSelectedMatiere}
                  />
                ))}
              </div>
            ))}
          </Form>
        </Accordion.Body>
      </Accordion.Item>
      {/* END OF FILTER SELECTION */}
    </>
  )
}

export default MatiereFilter