import React from 'react'
import {Accordion, Form} from 'react-bootstrap';

const CategoriesFilter = ({
  categories, 
  setValueCategorie
}) => {
  
  function getSelectedCategorie(event){
    setValueCategorie(event.target.value)
  }

  const tousCategories = ["tous",...new Set(categories.map(e => e.nom))]


  return (
    <>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Categorie</Accordion.Header>
        <Accordion.Body>
          <Form>
            {["radio"].map((type) => (
              <div key={`default-${type}`} className="mb-3">
                 
                    {tousCategories.map((categorie, index) => (
                      <Form.Check 
                        key={index}
                        name={`AllCategorie`}
                        type={type}
                        id={`allcategorie${categorie}`}
                        label={categorie}
                        value={categorie}
                        defaultChecked={index === 0}
                        onChange={getSelectedCategorie}
                      />
                    ))}
                
              </div>
            ))}
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </>
  );
}

export default CategoriesFilter