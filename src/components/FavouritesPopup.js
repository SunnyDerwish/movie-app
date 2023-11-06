import React from 'react';
import './FavouritesPopup.css'; // Ensure you have this CSS file for styles

const FavouritesPopup = ({ favourites, onRemoveFavourite }) => {
  // This function will be called when the user clicks to remove a movie from favourites
  const handleRemoveClick = (movie) => {
    onRemoveFavourite(movie);
  };

  return (
    <div className="favourites-popup">
      <h2>Favourites</h2>
      <ul className="list-unstyled">
        {favourites.map((movie, index) => (
          <li key={index} className="favourite-item">
            <div className="favourite-content">
              <span>{movie.Title} ({movie.Year})</span>
              <button
                onClick={() => handleRemoveClick(movie)}
                className="remove-favourite"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavouritesPopup;
