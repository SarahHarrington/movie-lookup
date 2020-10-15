import React from 'react';

export default function MoviePoster(props) {
  return (
    <div className="movie-poster-wrapper">
      { props.poster === 'N/A' ?
        <span className="material-icons movie-icon">movie</span> : 
        <img 
          className="movie-poster" 
          src={props.poster} 
          alt={props.title}
          loading="lazy"/>
      } 
    </div>
  )
}