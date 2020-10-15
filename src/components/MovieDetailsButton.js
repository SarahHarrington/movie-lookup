import React from 'react';

export default function MovieDetailsButton(props) {
  return ( <>
    <button 
      onClick={props.onHideMovieDetails}
      className="button"
      aria-label="Show Less"
    >Show Less</button>
    
    <button 
    name={imdbID} 
    onClick={props.getMovieDetails}
    className="button"
    aria-label="Show More">Show More</button>
    </>
  )
}