import React from 'react'
import { Accordion, Form } from 'react-bootstrap'


const CaratsFilter = ({setValueCarats}) => {

    const matiereCt = ["tous", "750/18 ct", "585/14 ct ", "375/9 ct"]
    //"925/22 ct", argent

    const getSelectedCarats = (event) => {
      setValueCarats(event.target.value);
    };

  return (
    <>
        <Accordion.Item eventKey="3">
        <Accordion.Header>Carats</Accordion.Header>
        <Accordion.Body>
          <Form>
            {["radio"].map((type) => (
              <div key={`default-${type}`} className="mb-3">
                
                {matiereCt.map((ct, index) => (
                  <Form.Check // prettier-ignore
                    key={index}
                    name={`matiereCt`}
                    type={type}
                    id={`ct${ct}`}
                    label={ct}
                    value={ct}
                    defaultChecked={index === 0}
                    onChange={getSelectedCarats}
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
export default CaratsFilter