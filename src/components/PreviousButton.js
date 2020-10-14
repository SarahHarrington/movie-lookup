import React from 'react';

export default function PreviousButton(props) {

  return (
    <button
      className="button prev-button"
      name={parseInt(props.currentPage - 1)}
      onClick={props.onGetPreviousPage}
      aria-label="Previous Page"
    >
      <span className="material-icons">navigate_before</span>
    </button>
  );
}