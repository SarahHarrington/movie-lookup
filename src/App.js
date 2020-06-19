import React, {useState, useEffect} from "react";
import MovieListItem from './components/MovieListItem';

const REACT_APP_MOVIE_API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

// function useKey(key) {
//   // Keep track of key state
//   const [pressed, setPressed] = useState(false)

//   // Does an event match the key we're watching?
//   const match = event => key.toLowerCase() == event.key.toLowerCase()

//   // Event handlers
//   const onDown = event => {
//       if (match(event)) setPressed(true)
//   }

//   const onUp = event => {
//       if (match(event)) setPressed(false)
//   }

//   // Bind and unbind events
//   useEffect(() => {
//       window.addEventListener("keydown", onDown)
//       window.addEventListener("keyup", onUp)
//       return () => {
//           window.removeEventListener("keydown", onDown)
//           window.removeEventListener("keyup", onUp)
//       }
//   }, [key])

//   return pressed
// }

function App() {
  // const enterKey = useKey('enter');
  // console.log(enterKey);

  const [movies, setMovies] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const [movieToFind, setMovieToFind] = React.useState("");
  const [movieNotFound, setMovieNotFound] = React.useState("showMovies");

  const getMovies = async (e) => {
    e.preventDefault();
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
            movies.length > 0 && 
            movies.map(movie => (
              <MovieListItem 
              key={movie.imdbID}
              movie={movie}
              /> 
              )) :
              <div className="movie-not-found slide-in">
            <p>No Movies Found!</p>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
