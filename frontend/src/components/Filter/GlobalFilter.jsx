import React from 'react'
import {Accordion} from 'react-bootstrap';
import SelectionFilter from './SelectionFilter'
import { useState } from 'react';
import CategoriesFilter from './CategoriesFilter';
import TypeDeBagueFilter from './TypeDeBagueFilter';


const GlobalFilter = ({
  selectionId, 
  setSelectionId, 
  articles,
  categories,
  bagues,

}) => {
const [selectedSelection, setSelectedSelection] = useState('tous')


  return (
    <Accordion defaultActiveKey="0" alwaysOpen>
      
      <SelectionFilter 
      selection={setSelectionId} 
      setSelectedSelection={setSelectedSelection}
      />

      <CategoriesFilter 
      articles={articles} 
      categories={categories}
      selectedSelection={selectedSelection}
      />

      <TypeDeBagueFilter
      bagues={bagues}
      articles={articles} 
       />


      
    </Accordion>
  );
}
export default GlobalFilter