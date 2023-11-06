import React, { useState, useEffect } from 'react';
import AddFavourites from './components/AddFavourites';

const SearchBox = ({ searchValue, setSearchValue, movies, onSelectMovie }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [hoveredMovieId, setHoveredMovieId] = useState(null);

  useEffect(() => {
    setIsDropdownVisible(movies && movies.length > 0 && searchValue !== '');
  }, [movies, searchValue]);

  const sortedMovies = (movies || []).sort((a, b) => a.Year.localeCompare(b.Year));

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSelectMovie(searchValue);
    }
  };

  const handleMovieSelect = (event, movie) => {
    event.preventDefault();
    onSelectMovie(movie);
  };

  return (
    <div className='col col-sm-4'>
      <input
        className='form-control'
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        placeholder='Type to search...'
        onFocus={() => setIsDropdownVisible(true)}
        onBlur={() => setIsDropdownVisible(false)}
        onKeyDown={handleKeyDown}
      />
      {isDropdownVisible && (
        <div className='dropdown-menu show'>
          <div className='dropdown-content' style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {sortedMovies.map((movie) => (
              <div 
                key={movie.id} // Assuming each movie has a unique 'id' field
                className='dropdown-item'
                onMouseEnter={() => setHoveredMovieId(movie.id)}
                onMouseLeave={() => setHoveredMovieId(null)}
                onClick={(e) => handleMovieSelect(e, movie)}
              >
                {movie.Title} ({movie.Year})
                {hoveredMovieId === movie.id && <AddFavourite />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
