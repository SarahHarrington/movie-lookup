import React from 'react';

export default function MovieSearch(props) {
  return (
    <form 
        className="search-form"
        onSubmit={props.onGetMovies}>
      <label className="visually-hidden">Search for Movie</label>
      <input
        type="search"
        name="moviesearchfield"
        defaultValue={props.movieToFind}
        placeholder={props.movieToFind}
        onChange={props.onHandleChange}
      />
      <input 
        type="submit" 
        value="Find Movie"
        className="button"
        aria-label="submit search"
      />
      </form>
  )
}

