import React from 'react';

function Rating(props) {
  const {ratings} = props;

  return (
    <>
      {ratings.length === 0 ?
        <> </> : 
        <h3 className="ratings-header">Ratings</h3>
      }
      {ratings.map(rating => (
        <div 
          className="movie-ratings"
          key={rating.Source}
        >
          <p className="movie-details-label">{rating.Source}</p>
          <p>{rating.Value}</p>
        </div>
      ))
      }
    </>
  )
}

export default Rating;