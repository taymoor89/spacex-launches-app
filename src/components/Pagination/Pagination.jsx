import React from "react";
import PropTypes from "prop-types";

import "./Pagination.css";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="pagination">
      <button
        aria-label="first"
        disabled={isFirstPage}
        onClick={() => onPageChange(1)}
      >
        First
      </button>
      <button
        aria-label="previous"
        disabled={isFirstPage}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      <span>{`${currentPage}/${totalPages}`}</span>
      <button
        aria-label="next"
        disabled={isLastPage}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
      <button
        aria-label="last"
        disabled={isLastPage}
        onClick={() => onPageChange(Math.ceil(totalPages))}
      >
        Last
      </button>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
