import React, {useState} from 'react';
import MoviePoster from './MoviePoster';
import MovieItemDetails from './MovieItemDetails';

const REACT_APP_MOVIE_API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

function MovieList (props) {
  const {Poster, Title, Year, imdbID} = props.movie;
  const [movieDetails, setMovieDetails] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [movieRatings, setMovieRatings] = useState(false);

  function getMovieDetails(e) {
    e.preventDefault();
    fetch(`https://www.omdbapi.com/?&apikey=${REACT_APP_MOVIE_API_KEY}&type=movie&i=${e.currentTarget.name}&plot=full`)
      .then(res => res.json())
      .then(res => {
        setMovieDetails({...res})
        setMovieRatings(true)
      })
      .catch(e => console.log('oops', e))
    setShowDetails(true);
  }

  function hideMovieDetails(e) {
    e.preventDefault();
    setShowDetails(false);
  }

  return (
    <div className="movie-item">
      <MoviePoster 
        poster={Poster}
        title={Title}
      />
      <div className="movie-details">
          <h2 className="movie-title">{Title} ({Year})</h2>
          
          {showDetails ?  
            <MovieItemDetails 
              movieDetails={movieDetails}
              onClick={hideMovieDetails}
              movieRatings={movieRatings}
            />
            :
            <button 
              name={imdbID} 
              onClick={getMovieDetails}
              className="button"
              aria-label="Show More">Show More</button>
          }
        </div>
      
    </div>
    
  )
}

export default MovieList;