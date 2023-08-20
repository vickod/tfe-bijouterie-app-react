import React from "react";
import { Accordion, Form } from "react-bootstrap";

const SelectionFilter = ({ selection, setSelectedSelection }) => {
  const selections = ["tous", "homme", "femme"];

  const changeSelection = (event) => {
    selection(event.target.value);
    setSelectedSelection(selections[event.target.value])
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
                    onChange={changeSelection}
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
