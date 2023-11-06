import React from 'react';

const SearchResults = ({ searchResults, handleSelect }) => {
  return (
    <section className='search-results-container'>
      {searchResults.map(({ imdbID, Poster, Title, Year }) => (
        <article key={imdbID} className='movie-result-item d-flex flex-row align-items-center p-3'>
          <img
            src={Poster}
            alt={`${Title} Poster`}
            className='movie-poster'
            loading="lazy"
          />
          <div className='movie-info ml-3'>
            <h5 className='movie-title'>{Title}</h5>
            <p className='movie-release-date'>{Year}</p>
          </div>
          <button
            onClick={() => handleSelect({ imdbID, Poster, Title, Year })}
            className='select-movie-button'
            aria-label={`Select ${Title}`}
            type="button"
          >
            Select
          </button>
        </article>
      ))}
    </section>
  );
};

export default SearchResults;
