import React from 'react'
import { Accordion, Form } from 'react-bootstrap'


const TypeDeBagueFilter = ({articles, bagues}) => {
  //tous types de bagues
    const tousTypesDeBague = ["tous",...new Set(bagues.map(e => e.type))]
      
    const typeDeBagueHomme = ["tous"]
    for(const article of articles){
        if(article.selectionId === 1){
            for(const bague of bagues){
                if(article.id === bague.articleId){
                    typeDeBagueHomme.push(bague.type)
                }
            }
        }
    }
    const typeDeBagueHommeWithoutDuplicate = Array.from(new Set(typeDeBagueHomme))
   

   const typeDeBagueFemme = ["tous"]
   for(const article of articles){
       if(article.selectionId === 2){
           for(const bague of bagues){
               if(article.id === bague.articleId){
                   typeDeBagueFemme.push(bague.type)
               }
           }
       }
   }
   const typeDeBagueFemmeWithoutDuplicate = Array.from(new Set(typeDeBagueFemme))
  console.log(typeDeBagueFemmeWithoutDuplicate)

    return (
    <>
        <Accordion.Item eventKey="2">
        <Accordion.Header>Type de bague</Accordion.Header>
        <Accordion.Body>
        
        
        <Form>
            {["radio"].map((type) => (
              <div key={`default-${type}`} className="mb-3">

                {/* Si selection=tous, categorie=bague */}
                {tousTypesDeBague.map((bague, index) => (
                  <Form.Check // prettier-ignore
                    key={index}
                    name={`tousTypesDeBague`}
                    type={type}
                    id={`tous${bague}`}
                    label={bague}
                    value={bague}
                  />
                ))}

                {/* Si selection=homme, categorie=bague */}
                {typeDeBagueHommeWithoutDuplicate.map((bague, index) => (
                  <Form.Check // prettier-ignore
                    key={index}
                    name={`hommeTypesDeBague`}
                    type={type}
                    id={`homme${bague}`}
                    label={bague}
                    value={bague}
                  />
                ))}
                {/* Si selection=femme, categorie=bague */}
                {typeDeBagueFemmeWithoutDuplicate.map((bague, index) => (
                  <Form.Check // prettier-ignore
                    key={index}
                    name={`femmeTypesDeBague`}
                    type={type}
                    id={`femme${bague}`}
                    label={bague}
                    value={bague}
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

export default TypeDeBagueFilter