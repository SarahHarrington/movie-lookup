import * as React from "react";

export default function Movie(props) {
  const { Title, Poster, imdbID } = props.movie;
  const [rottenScore, setRottenScore] = React.useState("");
  const [movieDetails, setMovieDetails] = React.useState("");
  // const [movieRatings, setMovieRatings] = React.useState([]);

  React.useEffect(() => {
    // console.log("imdbID", imdbID);
    fetch(`https://www.omdbapi.com/?&apikey=9504059f&i=${imdbID}`)
      .then(res => res.json())
      .then(res => {
        setMovieDetails(res);
        // getTheTomatoe()
      })
      .catch(e => console.log("error", e));
    
    // if (typeof movieDetails.Ratings === "undefined") {
    //   return;
    // } else {
    // setMovieRatings(movieDetails.Ratings);
    // console.log(movieDetails)
    // }
  }, []);

  // React.useEffect(() => {
  //   getTheTomatoe();
  // }, [movieRatings]);

  // function getTheTomatoe() {
  //   console.log("called movie ratings", movieRatings);
  //   const tomato = movieRatings.filter(
  //     rater => rater.Source === "Rotten Tomatoes"
  //   );
  //   console.log("tomato", tomato);
  //   if (tomato.length === 1) {
  //     setRottenScore(tomato[0].Value);
  //   }
  // }

  return (
    <div>
      <div className="movie">
        <img src={Poster} alt={Title} />
        <div className="movie-details">
          <h1 className="movie-title">{Title}</h1>
          <p>{movieDetails.Rated}</p>
          <p>Runtime {movieDetails.Runtime}</p>
          <div>{rottenScore && <p>Rotten Tomatoes {rottenScore} </p>} </div>
        </div>
      </div>
    </div>
  );
}
