import React from 'react'
import {Accordion} from 'react-bootstrap';
import SelectionFilter from './SelectionFilter'
import CategoriesFilter from './CategoriesFilter';
import MatiereFilter from './MatiereFilter';
import CaratsFilter from './CaratsFilter';
import TypeDePierreFilter from './TypeDePierreFilter';
import TypeDePerles from './TypeDePerles';
import SortFilter from './SortFilter';

const GlobalFilter = ({
  articles,
  categories,
  matieres,
  typeDePierres,
  typeDePerles,

  setValueSelectionId,
  setValueCategorie, 
  setValueMatieres,
  setValueCarats,
  setValuePierres,
  setValuePerles,
  setValueSort

}) => {




  return (
    //alwaysOpen
    <Accordion defaultActiveKey="0" >   
      
      <SelectionFilter 
      setValueSelectionId={setValueSelectionId} 
      />
      
      <CategoriesFilter 
      categories={categories}
      setValueCategorie={setValueCategorie}
      />

      <MatiereFilter 
      matieres={matieres}
      setValueMatieres={setValueMatieres}
      />   

     
      <CaratsFilter 
      setValueCarats={setValueCarats}
      />
     

      <TypeDePierreFilter 
        typeDePierres={typeDePierres}
        setValuePierres={setValuePierres}
      />

      <TypeDePerles 
        typeDePerles={typeDePerles}
        setValuePerles={setValuePerles}
      />

     <SortFilter 
      setValueSort={setValueSort}
     />

    </Accordion>
  );
}
export default GlobalFilter