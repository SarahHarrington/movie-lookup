import React, {useState, useEffect} from "react";
import MovieListItem from './components/MovieListItem';

const REACT_APP_MOVIE_API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

function App() {

  const [movies, setMovies] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const [movieToFind, setMovieToFind] = React.useState("");
  const [movieNotFound, setMovieNotFound] = React.useState("showMovies");

  const getMovies = async () => {
    setMovieToFind(inputValue.trim().toLowerCase());
    setInputValue("");

  };

  React.useEffect(() => {

  }, [movieNotFound])

  React.useEffect(() => {
    if (movieToFind === '') {
      return
    } else {
      
      fetch(
        `https://www.omdbapi.com/?&apikey=${REACT_APP_MOVIE_API_KEY}&type=movie&s=${movieToFind}`
        )
        .then(res => res.json())
        .then(res => {
          console.log(res.Response)
          if (res.Response === 'False') {
            console.log('in the false')
            setMovieNotFound("hide")
          }
          else {
            console.log('in the true')
            setMovieNotFound("showMovies")
            setMovies(res.Search);
          }
        })
        .catch(e => console.log("error", e));
      }
    // }
  }, [movieToFind]);

  return (
    <div className="App">
      <header>Find a Movie</header>
      <div className="search-form">
        <input
          type="text"
          value={inputValue}
          placeholder={movieToFind}
          onChange={e => setInputValue(e.target.value)}
        />
        <button onClick={getMovies}>Find Movie!</button>
      </div>
      {movieNotFound === "showMovies" ?
          movies.length > 0 && 
          movies.map(movie => (
            <MovieListItem 
              key={movie.imdbID}
              movie={movie}
          /> 
        )) :
        <div>Movie Not Found!</div>
      }
    </div>
  );
}

export default App;
