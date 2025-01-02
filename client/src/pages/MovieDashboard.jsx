import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import videoClipImage from "../assets/video-clip-image.png";

const MovieDashboard = () => {
    const navigate = useNavigate();

    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [totalRecordCount, setTotalRecordCount] = useState(0);
    const itemsPerPage = 10;

    const [actionMovies, setActionMovies] = useState([]);
    const [comedyMovies, setComedyMovies] = useState([]);
    const [horrorMovies, setHorrorMovies] = useState([]);

  
    useEffect(() => {
        const fetchSearchResults = async () => {
        try {
            const res = await axios.get(
            `https://www.omdbapi.com/?apikey=21969482&s=${
                searchKeyword || "action"
            }&page=${currentPageNumber}`
            );
            if (res.data.Response === "True") {
            setSearchResults(res.data.Search);
            setTotalRecordCount(parseInt(res.data.totalResults, 10));
            } else {
            setSearchResults([]);
            setTotalRecordCount(0);
            }
        } catch (error) {
            console.error(error);
            setSearchResults([]);
            setTotalRecordCount(0);
        }
        };

        fetchSearchResults();

        // Cleanup
        return () => {
        setSearchResults([]);
        };
    }, [searchKeyword, currentPageNumber]);

    useEffect(() => {
        const fetchRow = async (query) => {
        try {
            const res = await axios.get(
            `https://www.omdbapi.com/?apikey=21969482&s=${query}&page=1`
            );
            if (res.data.Response === "True") {
            return res.data.Search;
            }
            return [];
        } catch (error) {
            console.error(error);
            return [];
        }
        };

        const fetchAllRows = async () => {
        const [actionData, comedyData, horrorData] = await Promise.all([
            fetchRow("action"),
            fetchRow("comedy"),
            fetchRow("horror"),
        ]);

        setActionMovies(actionData);
        setComedyMovies(comedyData);
        setHorrorMovies(horrorData);
        };

        fetchAllRows();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPageNumber(1);
    };

    const totalPages = Math.ceil(totalRecordCount / itemsPerPage);

    const handlePreviousPage = () => {
        if (currentPageNumber > 1) {
            setCurrentPageNumber((prev) => prev - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPageNumber < totalPages) {
            setCurrentPageNumber((prev) => prev + 1);
        }
    };

    const renderMovieRow = (title, movies) => {
        return (
        <div className="movie-row-section">
            <h2 className="section-title">{title}</h2>
            <br />
            <div className="movie-row">
            {movies &&
                movies.map((movie) => (
                <div
                    onClick={() => navigate(`/movie-details/${movie.imdbID}`, { state: { genreCategory: title === "Action Picks" ? "action" : title ===  "Comedy Highlights" ? "comedy" : "horror" } })}
                    className="movie-row-card"
                    key={movie.imdbID}
                >
                    <img
                    src={
                        movie.Poster !== "N/A" ? movie.Poster : { videoClipImage }
                    }
                    alt={movie.Title}
                    className="movie-row-poster"
                    />
                    <div className="movie-row-card-content">
                    <h3 className="movie-row-title">{movie.Title}</h3>
                    <p className="movie-row-year">{movie.Year}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
        );
    };

    const genreCategory = [
        "Adventure",
        "Animated",
        "Drama",
        "Fantasy",
        "Historical"
    ]

    const handleGenreCategory = (category) => {
        setSearchKeyword(category)
    }

    return (
    <>
      <div className="dashboard-container">

        {/* SEARCH FORM */}
        {/* <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search movies..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="search-input"
          />
        </form> */}

        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/GV9AEEIeHrQ?autoplay=1&mute=1&controls=0&rel=0&showinfo=0"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <br />
        
        {renderMovieRow("Action Picks", actionMovies)}
        {renderMovieRow("Comedy Highlights", comedyMovies)}
        {renderMovieRow("Horror Collection", horrorMovies)}

        
        <div className="search-results-section">
          <h2 className="section-title">Search Results ( {searchKeyword || "Action"} )</h2>
          <br />

        <div className="genre-category-session">
            {genreCategory.map((value, key) => {
                return <div onClick={() => handleGenreCategory(value)} key={key}> {value} </div>
            })}
        </div>

          <div className="movie-grid">
            {searchResults.map((movie) => (
              <div
                onClick={() => navigate(`/movie-details/${movie.imdbID}`, { state: { genreCategory: searchKeyword } })}
                className="movie-card"
                key={movie.imdbID}
              >
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : videoClipImage}
                  alt={movie.Title}
                  className="movie-poster"
                />
                <div className="movie-card-content">
                  <h2 className="movie-title">{movie.Title}</h2>
                  <p className="movie-year">{movie.Year}</p>
                </div>
              </div>
            ))}
          </div>

          
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={handlePreviousPage}
                disabled={currentPageNumber === 1}
                className="pagination-button"
              >
                Previous
              </button>
              <span className="pagination-info">
                Page {currentPageNumber} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPageNumber === totalPages}
                className="pagination-button"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MovieDashboard;
