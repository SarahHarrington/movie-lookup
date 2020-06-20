import React, {useState, useEffect} from "react";
import MovieListItem from './components/MovieListItem';

const REACT_APP_MOVIE_API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

function App() {

  const [currentMovies, setCurrentMovies] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const [movieToFind, setMovieToFind] = React.useState("");
  const [movieNotFound, setMovieNotFound] = React.useState("showMovies");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [nextPage, setNextPage] = React.useState(false);

  const getMovies = async (e) => {
    e.preventDefault();
    setMovieToFind(inputValue.trim().toLowerCase());
    setInputValue("");
    setCurrentPage(1);
    setNextPage(false);
  };

  React.useEffect(() => {
  }, [movieNotFound])

  // Hook that gets the movies from API
  React.useEffect(() => {
    if (movieToFind === '') {
      return
    } else {
      fetch(
        `https://www.omdbapi.com/?&apikey=${REACT_APP_MOVIE_API_KEY}&type=movie&s=${movieToFind}&page=${currentPage}`
        )
        .then(res => res.json())
        .then(res => {
          if (res.Response === 'False') {
            setMovieNotFound("hide")
          }
          else {
            setMovieNotFound("showMovies")
            setCurrentMovies(res.Search);
            checkForNextPage(currentPage + 1);
          }
        })
        .catch(e => console.log("error", e));
      }
    // }
  }, [movieToFind]);

  function getNextPage(e) {
    e.preventDefault();
    getMoreMovies(e.currentTarget.name)
  }

  function getPreviousPage(e) {
    e.preventDefault();
    if (e.currentTarget.name === 0) {
      return
    } else {
      getMoreMovies(e.currentTarget.name)
    }
  }

  function checkForNextPage(pageNumber) {
    fetch(
      `https://www.omdbapi.com/?&apikey=${REACT_APP_MOVIE_API_KEY}&type=movie&s=${movieToFind}&page=${pageNumber}`
      )
      .then(res => res.json())
      .then(res => {
        if (res.Response === 'False') {
          setNextPage(false)
          return
        } else {
          setNextPage(true);
        }
      })
      .catch(e => console.log('Something went wrong!'))
  }

  function getMoreMovies(pageNumber) {
    console.log('the page number being fetched', pageNumber)
    setCurrentPage(parseInt(pageNumber));
    fetch(
      `https://www.omdbapi.com/?&apikey=${REACT_APP_MOVIE_API_KEY}&type=movie&s=${movieToFind}&page=${pageNumber}`
      )
      .then(res => res.json())
      .then(res => {
        if (res.Response === 'False') {
          return
        } else {
          setCurrentMovies(res.Search)
        }
      })
      .catch(e => console.log('Something went wrong!'))
  }

  return (
    <div className="App">
      <header>
        <h1>Find a Movie</h1>
      </header>
      <form 
        className="search-form"
        onSubmit={getMovies}>
        <label 
          className="visually-hidden"
          htmlFor="moviesearchfield"></label>
        <input
          type="text"
          name="moviesearchfield"
          value={inputValue}
          placeholder={movieToFind}
          onChange={e => setInputValue(e.target.value)}
        />
        <input 
          type="submit" 
          value="Find Movie"
          className="button"/>
      </form>
      <div className="movie-list">
        {movieNotFound === "showMovies" ?
            currentMovies.length > 0 && 
            currentMovies.map(movie => (
              <MovieListItem 
              key={movie.imdbID}
              movie={movie}
              /> 
              )) :
          <div className="movie-not-found slide-in">
            <span class="material-icons movie-not-found">
              confirmation_number
            </span>
            <p>No Movies Found!</p>
          </div>
        }
      </div>

      {movieToFind !== '' &&
        <div className="movie-pages">
          {parseInt(currentPage) !== 1 && 
            <button
            className="button prev-button"
            name={parseInt(currentPage - 1)}
            onClick={getPreviousPage}>
              <span class="material-icons">
                navigate_before
              </span>
            </button>
          }
          {
            currentPage > 1 &&
            <p className="current-page">{currentPage}</p>
          }
          {nextPage &&
            <button 
              className="button next-button"
              name={parseInt(currentPage + 1)}
              onClick={getNextPage}>
                <span class="material-icons">
                  navigate_next
                </span>
            </button>
          }
        </div>
      }
    </div>
  );
}

export default App;
