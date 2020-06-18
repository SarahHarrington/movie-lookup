import React, {useState, useEffect} from "react";
import MovieListItem from './components/MovieListItem';

function App() {

  const [movies, setMovies] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const [movieToFind, setMovieToFind] = React.useState("");
  // const [initialRender, setRender] = React.useState(false);

  const getMovies = async () => {
    setMovieToFind(inputValue.trim().toLowerCase());
    setInputValue("");

  };

  React.useEffect(() => {
    if (movieToFind === '') {
      return
    } else {
      
      fetch(
        `https://www.omdbapi.com/?&apikey=9504059f&type=movie&s=${movieToFind}`
        )
        .then(res => res.json())
        .then(res => {
          setMovies(res.Search);
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
          onChange={e => setInputValue(e.target.value)}
        />
        <button onClick={getMovies}>Find Movie!</button>
      </div>
      { 
        movies.length > 0 && 
        movies.map(movie => (
          <MovieListItem 
            key={movie.imdbID}
            movie={movie}
          />
        ))
      }

    </div>
  );
}

export default App;
