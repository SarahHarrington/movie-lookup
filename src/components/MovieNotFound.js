import React from 'react';

export default function MovieNotFound() {
  return(
    <div className="movie-not-found slide-in">
      <span className="material-icons movie-not-found">
        confirmation_number
      </span>
      <p>No Movies Found!</p>
    </div>
  )
}