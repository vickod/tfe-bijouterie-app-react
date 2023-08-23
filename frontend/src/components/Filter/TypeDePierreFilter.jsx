import React from 'react'
import { Accordion, Form } from 'react-bootstrap'
const TypeDePierreFilter = ({typeDePierres, setValuePierres}) => {

  const pierres = ["tous",...new Set(typeDePierres.map(e => e.nom))]

  const getSelectedPierre = (event) => {
    setValuePierres(event.target.value);
  };
    
  return (
    <>
        <Accordion.Item eventKey="4">
        <Accordion.Header>Type de pierres</Accordion.Header>
        <Accordion.Body>
          <Form>
            {["radio"].map((type) => (
              <div key={`default-${type}`} className="mb-3">
                
                {pierres.map((pierre, index) => (
                  <Form.Check // prettier-ignore
                    key={index}
                    name={`typeDePierres`}
                    type={type}
                    id={`pierre${pierre}`}
                    label={pierre}
                    value={index}
                    defaultChecked={index === 0}
                    onChange={getSelectedPierre}
                  />
                ))}

              </div>
            ))}
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </>
  )
}

export default TypeDePierreFilter