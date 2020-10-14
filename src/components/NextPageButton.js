import React from 'react';

export default function NextPageButton(props) {
  return (
    <button 
      className="button next-button"
      name={parseInt(props.currentPage + 1)}
      onClick={props.onGetNextPage}
      aria-label="Next Page"
      >
      <span className="material-icons">
        navigate_next
      </span>
    </button>
  )
}