import React, {useState, useEffect} from 'react';
import Rating from './Rating';

const REACT_APP_MOVIE_API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

function MovieList (props) {
  const {Poster, Title, Year, imdbID, Type} = props.movie;
  const [movieDetails, setMovieDetails] = React.useState({});
  const [showDetails, setShowDetails] = React.useState(false);
  const [movieIDToSearch, setMovieIdToSearch] = React.useState('');
  const [movieRatings, setMovieRatings] = React.useState(false);

  async function getMovieDetails(e) {
    e.preventDefault();
    setMovieIdToSearch(e.currentTarget.name)
    console.log('movie id to search', movieIDToSearch)
    setShowDetails(true);

  }

  React.useEffect(() => {
    if (movieIDToSearch === '') {
      return
    } else {
      console.log('fetch!', movieIDToSearch)
      fetch(`https://www.omdbapi.com/?&apikey=${REACT_APP_MOVIE_API_KEY}&type=movie&i=${movieIDToSearch}&plot=full`)
      .then(res => res.json())
      .then(res => {
        setMovieDetails({...res})
        setMovieRatings(true)
      })
      .catch(e => console.log('oops', e))
    }
  }, [movieIDToSearch])

  function hideMovieDetails(e) {
    e.preventDefault();
    setShowDetails(false);
  }

  return (
    <div className="movie-item">
      <div >
        { Poster === 'N/A' ?
          <span className="material-icons movie-icon">movie</span> : 
          <img className="movie-poster" src={Poster} alt={Title}/>
        }

      </div>
      <div>
        <div>
          <h1 className="movie-title">{Title} ({Year})</h1>
          
          {showDetails ?  
            <div>
              
              { 
                movieDetails.Rated !== 'N/A' ? 
                <p>{movieDetails.Rated}</p> :
                <></>
              }
              
              <p>
                <span className="material-icons">schedule</span>
                {movieDetails.Runtime}
              </p>
              <p>{movieDetails.Plot}</p>
              <p>
                <span className="movie-details-label">Genre </span>
                {movieDetails.Genre}
              </p>
              {movieRatings ? 
                <Rating 
                  ratings={movieDetails.Ratings}
                /> :
                <></>
              }
              <button 
                onClick={hideMovieDetails}
                className="button">Show Less</button>
            </div> 
            :
            <button 
              name={imdbID} 
              onClick={getMovieDetails}
              className="button">Show More</button>
          }
        </div>
      </div>
    </div>
    
  )
}

export default MovieList;