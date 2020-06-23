import React from 'react';
import Rating from './Rating';

const REACT_APP_MOVIE_API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

function MovieList (props) {
  const {Poster, Title, Year, imdbID} = props.movie;
  const [movieDetails, setMovieDetails] = React.useState({});
  const [showDetails, setShowDetails] = React.useState(false);
  const [movieIDToSearch, setMovieIdToSearch] = React.useState('');
  const [movieRatings, setMovieRatings] = React.useState(false);

  async function getMovieDetails(e) {
    e.preventDefault();
    setMovieIdToSearch(e.currentTarget.name)
    setShowDetails(true);
  }

  React.useEffect(() => {
    if (movieIDToSearch === '') {
      return
    } else {
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
      <div className="movie-poster-wrapper">
        { Poster === 'N/A' ?
          <span className="material-icons movie-icon">movie</span> : 
          <img 
            className="movie-poster" 
            src={Poster} 
            alt={Title}
            loading="lazy"/>
        }

      </div>
      <div className="movie-details">
        
          <h2 className="movie-title">{Title} ({Year})</h2>
          
          {showDetails ?  
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
              {movieRatings ? 
                <>
                  <Rating ratings={movieDetails.Ratings}/> 
                </> :
                <></>
              }
              <button 
                onClick={hideMovieDetails}
                className="button"
                aria-label="Show Less">Show Less</button>
            </div> 
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