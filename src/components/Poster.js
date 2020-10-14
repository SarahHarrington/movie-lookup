import React from 'react';

function Poster(props) {
  const { poster, title } = props;
  return (
    <div className="movie-poster-wrapper">
      { poster === 'N/A' ?
        <span className="material-icons movie-icon">movie</span> : 
        <img 
          className="movie-poster" 
          src={poster} 
          alt={title}
          loading="lazy"/>
      } 
    </div>
  )
}

export default Poster;