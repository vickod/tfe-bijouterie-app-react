import React from 'react'
import { Accordion, Form } from 'react-bootstrap'

const TypeDePerles = ({typeDePerles, setValuePerles}) => {

  const perles = ["tous",...new Set(typeDePerles.map(e => e.type))]

  const getSelectedPerle = (event) => {
    setValuePerles(event.target.value);
  };

  return (
    <>
        <Accordion.Item eventKey="5">
        <Accordion.Header>Type de perles</Accordion.Header>
        <Accordion.Body>
          <Form>
            {["radio"].map((type) => (
              <div key={`default-${type}`} className="mb-3">
                
                {perles.map((perle, index) => (
                  <Form.Check // prettier-ignore
                    key={index}
                    name={`typeDeperles`}
                    type={type}
                    id={`perle${perle}`}
                    label={perle}
                    value={index}
                    defaultChecked={index === 0}
                    onChange={getSelectedPerle}
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

export default TypeDePerles