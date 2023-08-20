import React from 'react'
import {Accordion, Form} from 'react-bootstrap';

const CategoriesFilter = ({articles, categories, selectedSelection}) => {
  console.log()

    // get categories femme
  const femmeCategoriesList = []
  const hommeCategoriesList = []
  for (const article of articles){
    if(article.selectionId === 2){
      for( const categorie of categories){
        if(article.categorieId === categorie.id)
        femmeCategoriesList.push(categorie.nom)
      }
    }
    if(article.selectionId === 1){
      for( const categorie of categories){
        if(article.categorieId === categorie.id)
        hommeCategoriesList.push(categorie.nom)
      }
    }

  }
  const femmeCategoriesWithoutDuplicate = Array.from(new Set(femmeCategoriesList))
  const hommeCategoriesWithoutDuplicate = Array.from(new Set(hommeCategoriesList))
  

  return (
    <>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Categorie</Accordion.Header>
        <Accordion.Body>
          <Form>
            {["radio"].map((type) => (
              <div key={`default-${type}`} className="mb-3">
                
                {selectedSelection === "tous" && (
                  <>
                    <Form.Check // prettier-ignore
                      name={`AllCategorie`}
                      type={type}
                      id={`allCategorieTous`}
                      label="Tous"
                      value="tous"
                    />
                    {categories.map((categorie, index) => (
                      <Form.Check // prettier-ignore
                        key={index}
                        name={`AllCategorie`}
                        type={type}
                        id={`allcategorie${categorie.nom}`}
                        label={categorie.nom}
                        value={categorie.nom}
                      />
                    ))}
                  </>
                )}
                {selectedSelection === "homme" && (
                  <>
                    {
                      <Form.Check // prettier-ignore
                        name={`hommeCategorie`}
                        type={type}
                        id={`hommeCategorieTous`}
                        label={`Tous`}
                        value="tous"
                        defaultChecked
                      />
                    }
                    {hommeCategoriesWithoutDuplicate.map((categorie, index) => (
                      <Form.Check
                        key={index}
                        name={`hommeCategorie`}
                        type={type}
                        id={`hommeCategorie${categorie}`}
                        label={categorie}
                        value={categorie}
                      />
                    ))}
                  </>
                )}
                {selectedSelection === "femme" && (
                  <>
                    {
                      <Form.Check
                        name={`femmeCategorie`}
                        type={type}
                        id={`femmeCategorieTous`}
                        label={`Tous`}
                        value="tous"
                        defaultChecked
                      />
                    }
                    {femmeCategoriesWithoutDuplicate.map((categorie, index) => (
                      <Form.Check
                        key={index}
                        name={`femmeCategorie`}
                        type={type}
                        id={`femmeCategorie${categorie}`}
                        label={categorie}
                        value={categorie}
                      />
                    ))}
                  </>
                )}

              </div>
            ))}
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </>
  );
}

export default CategoriesFilter