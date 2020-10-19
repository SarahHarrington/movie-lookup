import React from 'react';
import Rating from './Rating';
import Button from './Button';

export default function MovieItemDetails(props) {
  const {movieDetails, onClick, movieRatings} = props;
  return (
    <div>
      <div className="rating-runtime">
        { 
          movieDetails.Rated !== 'N/A' ? 
          <p><span className="movie-details-label">Rated </span>{movieDetails.Rated}</p> :
          <></>
        }
        {
          movieDetails.Runtime !== 'N/A' ? 
          <p>
            <span className="material-icons">schedule</span>
            <span className="movie-details-label">length </span>{movieDetails.Runtime}
          </p>
          : <></>
        }
      </div>
      {
        movieDetails.Plot !== 'N/A' ?
        <p>{movieDetails.Plot}</p> : 
        <> </>
      }
      <p><span className="movie-details-label">Starring </span>{movieDetails.Actors}</p>
      <p>
        <span className="movie-details-label">Genre </span>
        {movieDetails.Genre}
      </p>
      <p>
        <span className="movie-details-label">Release Date </span>{movieDetails.Released}
      </p>
      <p>
        <span className="movie-details-label">Directed by </span>{movieDetails.Director}</p>
      {movieDetails.Writer !== 'N/A' &&
        <p><span className="movie-details-label">Written by </span>{movieDetails.Writer}</p>
      }
      {movieRatings && 
          <Rating ratings={movieDetails.Ratings}/>
      }
      <Button 
        styles={'button'}
        label={'Show Less'}
        onClick={onClick}
      />
    </div> 
  )
}