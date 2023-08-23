import React from "react";
import { Accordion, Form } from "react-bootstrap";

const SelectionFilter = ({ setValueSelectionId }) => {
  const selections = ["tous", "homme", "femme"];

  const getSelectedSelection = (event) => {
    setValueSelectionId(event.target.value);
  };

  return (
    <>
      {/* FILTER SELECTION */}

      <Accordion.Item eventKey="0">
        <Accordion.Header>Sélection</Accordion.Header>
        <Accordion.Body>
          <Form>
            {["radio"].map((type) => (
              <div key={`default-${type}`} className="mb-3">
                {selections.map((selection, index) => (
                  <Form.Check // prettier-ignore
                    key={index}
                    name={`selection`}
                    type={type}
                    id={`selection${selection}`}
                    label={selection}
                    value={index}
                    defaultChecked={index === 0}
                    onChange={getSelectedSelection}
                  />
                ))}
              </div>
            ))}
          </Form>
        </Accordion.Body>
      </Accordion.Item>
      {/* END OF FILTER SELECTION */}
    </>
  );
};

export default SelectionFilter;
