import React, {useState} from "react";
import MovieListItem from './components/MovieListItem';
import MovieSearch from './components/MovieSearch';
import Loader from './components/Loader';
import MovieNotFound from './components/MovieNotFound';
import PreviousButton from "./components/PreviousButton";
import NextPageButton from "./components/NextPageButton";

const REACT_APP_MOVIE_API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

function App() {

  const [currentMovies, setCurrentMovies] = useState([]);
  const [movieToFind, setMovieToFind] = useState("");
  const [movieNotFound, setMovieNotFound] = useState("showMovies");
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function getMovies(e) {
    setIsLoading(true);
    e.preventDefault();
    setCurrentPage(1);
    setNextPage(false);
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
      .catch(e => console.log("error", e))
      .finally(() => {
        setIsLoading(false)
      })
    };

  function getNextPage(e) {
    e.preventDefault();
    setIsLoading(true)
    getMoreMovies(e.currentTarget.name)
  }

  function getPreviousPage(e) {
    e.preventDefault();
    if (e.currentTarget.name === 0) {
      return
    } else {
      setIsLoading(true)
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
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleMovieSearchInput(event) {
    setMovieToFind(event.target.value.trim().toLowerCase())
  }

  return (
    <div className="App">
      <header>
        <h1>Find a Movie</h1>
      </header>
      <MovieSearch 
        onHandleChange={handleMovieSearchInput}
        movieToFind={movieToFind}
        onGetMovies={getMovies}
      />
      {isLoading ? <Loader /> : 
        <div className="movie-list">
          {movieNotFound === "showMovies" ?
              currentMovies && 
              currentMovies.map(movie => (
                <MovieListItem 
                  key={movie.imdbID}
                  movie={movie}
                /> 
                )) :
            <MovieNotFound />
          }
        </div>      
      }

      {movieToFind !== '' &&
        <div className="movie-pages">
          {parseInt(currentPage) !== 1 && 
            <PreviousButton 
              onGetPreviousPage={getPreviousPage}
              currentPage={currentPage}
            />
          }
          {
            currentPage > 1 &&
            <p className="current-page">{currentPage}</p>
          }
          {nextPage &&
            <NextPageButton 
              onGetNextPage={getNextPage}
              currentPage={currentPage}
            />
          }
        </div>
      }
    </div>
  );
}

export default App;
