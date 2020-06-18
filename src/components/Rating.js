import React from 'react';

function Rating(props) {
  console.log('ratings', props)
  const {ratings} = props;

  return (
    <div>
      {ratings.map(rating => (
        <div 
          className="movie-ratings"
          key={rating.Source}
        >
          <p>{rating.Source}</p>
          <p>{rating.Value}</p>
        </div>
      ))
      }
    </div>
  )
}

export default Rating;