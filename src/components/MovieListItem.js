import React, {useState} from 'react';
import Rating from './Rating';

const REACT_APP_MOVIE_API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

function MovieList (props) {
  // console.log(props.movie)
  const {Poster, Title, Year, imdbID, Type} = props.movie;
  const [movieDetails, setMovieDetails] = React.useState({})
  const [showDetails, setShowDetails] = React.useState(false)

  async function getMovieDetails(e) {
    e.preventDefault();
    
    setShowDetails(true);
    
    const movieIDToSearch = e.currentTarget.name;
    
    await fetch(`https://www.omdbapi.com/?&apikey=${REACT_APP_MOVIE_API_KEY}&type=movie&i=${movieIDToSearch}&plot=full`)
      .then(res => res.json())
      .then(res => {
        setMovieDetails({...res})
      })
      .catch(e => console.log('oops', e))
  }

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
              <p>{movieDetails.Rated}</p>
              <p>{movieDetails.Runtime}</p>
              <p>{movieDetails.Plot}</p>
              <p>{movieDetails.Genre}</p>
              {movieDetails.Ratings === 'undefined' ? 
                <Rating ratings={movieDetails.Ratings}/>
                : ''
              }
              <button onClick={hideMovieDetails}>Show Less</button>
            </div> 
            :
            <button name={imdbID} onClick={getMovieDetails}>Show More</button>
          }
        </div>
      </div>
    </div>
    
  )
}

export default MovieList;