import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationItems = ({ currentPage, itemsPerPage, totalItems, paginate }) => {
  
    const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // affiche trois liens (précédent, actif, suivant)
  const previousPage = currentPage - 1 <= 0 ? 1 : currentPage - 1;
  const nextPage = currentPage + 1 > pageNumbers.length ? pageNumbers.length : currentPage + 1;

  return (
    <Pagination>
      <Pagination.First onClick={() => paginate(1)} />
      <Pagination.Prev onClick={() => paginate(previousPage)} />
      <Pagination.Item active>{currentPage}</Pagination.Item>
      <Pagination.Next onClick={() => paginate(nextPage)} />
      <Pagination.Last onClick={() => paginate(pageNumbers.length)} />
    </Pagination>
  );
};

export default PaginationItems;


