import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import FavouritesPopup from './components/FavouritesPopup';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';
import MovieList from './components/MovieList';
import SearchResults from './components/SearchResults';
const App = () => {
    const [movies, setMovies] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [searchValue, setSearchValue] = useState('');
	const [showFavourites, setShowFavourites] = useState(false);
    const [displayMovies, setDisplayMovies] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const getMovieRequest = async (searchValue) => {
        if (searchValue.length > 0) {
            const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=178f65d8&`;

            const response = await fetch(url);
            const responseJson = await response.json();

            if (responseJson.Search) {
                setMovies(responseJson.Search.sort((a, b) => a.Year.localeCompare(b.Year)));
            }
        } else {
            setMovies([]);
        }
    };

    const handleEnterPress = (searchValue) => {
        getMovieRequest(searchValue);
        setDisplayMovies(true);
    };

    useEffect(() => {
        if (searchValue) {
            getMovieRequest(searchValue);
        }
    }, [searchValue]);

    useEffect(() => {
        const movieFavourites = JSON.parse(
            localStorage.getItem('react-movie-app-favourites')
        );

        setFavourites(movieFavourites || []);
    }, []);

	useEffect(() => {
        const handleMouseMove = (e) => {
            
			if (e.clientX < 50) {
				setShowFavourites(true);
			} else {
				setShowFavourites(false);
			}
		};
		
		window.addEventListener('mousemove', handleMouseMove);

		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, []);


    const saveToLocalStorage = (items) => {
        localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
    };

    const addFavouriteMovie = (movie) => {
        const newFavouriteList = [...favourites, movie];
        setFavourites(newFavouriteList);
        saveToLocalStorage(newFavouriteList);
    };

    const removeFavouriteMovie = (movie) => {
        const newFavouriteList = favourites.filter(
            (favourite) => favourite.imdbID !== movie.imdbID
        );

        setFavourites(newFavouriteList);
        saveToLocalStorage(newFavouriteList);
    };
    const updateSearchValue = (value) => {
        setSearchValue(value);
        setDisplayMovies(false);
    }

    return (
        <div className='container-fluid movie-app'>
            <div className='row d-flex align-items-center mt-4 mb-4'>
                <MovieListHeading heading='Movies' />
                <SearchBox
                    onEnterPress={handleEnterPress}
                    searchValue={searchValue}
                    setSearchValue={updateSearchValue}
                    movies={movies}
                    // Placeholder function for when a movie is selected from the dropdown
                    onSelectMovie={(movie) => console.log(movie)}
                    
                />
            </div>
            {/* This row can be removed if you no longer wish to display movies in a row */}
            {/* <div className='row'>
                <MovieList
                    movies={movies}
                    handleFavouritesClick={addFavouriteMovie}
                    favouriteComponent={AddFavourites}
                />
            </div> */}
            { displayMovies && (
                <div className='row'>
                    <MovieList
                        movies={movies}
                        handleFavouritesClick={addFavouriteMovie}
                        favouriteComponent={AddFavourites}
                    />
                </div>
            )}

			{showFavourites && <FavouritesPopup favourites={favourites} />}
            <div className='row d-flex align-items-center mt-4 mb-4'>
                <MovieListHeading heading='Favourites' />
                {/* ... Existing code for displaying favourites ... */}
            </div>
        </div>
    );
};

export default App;
