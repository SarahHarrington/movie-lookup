import React, {useState} from 'react';

function MovieList (props) {
  // console.log(props.movie)
  const {Poster, Title, Year, imdbID, Type} = props.movie;
  const [movieDetails, setMovieDetails] = React.useState({})
  const [showDetails, setShowDetails] = React.useState(false)

  function getMovieDetails(e) {
    e.preventDefault();
    setShowDetails(true);
    const movieIDToSearch = e.currentTarget.name;
    // console.log('the movie link was clicked', e.currentTarget.name)

    fetch(`https://www.omdbapi.com/?&apikey=9504059f&type=movie&i=${movieIDToSearch}`)
      .then(res => res.json())
      .then(res => setMovieDetails({...res}))
      .catch(e => console.log('oops', e))
  }

  return (
    <div className="movie-item">
      <div >
        <img className="movie-poster" src={Poster} alt={Title}/>
      </div>
      <div>
        <div>
          <h1 className="movie-title">{Title} ({Year})</h1>
        </div>
        <button name={imdbID} onClick={getMovieDetails}>See More</button>
      </div>
      {showDetails && 
        <div>
          <p>{movieDetails.Rated}</p>
          <p>{movieDetails.Runtime}</p>
        </div> }
    </div>
    
  )
}

export default MovieList;