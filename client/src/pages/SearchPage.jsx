import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import videoClipImage from "../assets/video-clip-image.png";

const SearchPage = () => {
  const navigate = useNavigate();

  const [searchKeyword, setSearchKeyword] = useState("action");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalRecordCount, setTotalRecordCount] = useState(0);

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchKeyword) {
        setSearchResults([]);
        setTotalRecordCount(0);
        return;
      }

      try {
        const res = await axios.get(
          `https://www.omdbapi.com/?apikey=21969482&s=${searchKeyword}&page=${currentPageNumber}`
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
  }, [searchKeyword, currentPageNumber]);

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

  return (
    <div className="dashboard-container">
      <h1 className="section-title">Search Movies</h1>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Type movie keyword..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="search-input"
        />
      </form>

      <div className="search-results-section">
        {searchResults.length > 0 && (
          <h2 className="section-title">
            Results for: <em>{searchKeyword}</em>
          </h2>
        )}
        <div className="movie-grid">
          {searchResults.map((movie) => (
            <div
              className="movie-card"
              key={movie.imdbID}
              onClick={() => navigate(`/movie-details/${movie.imdbID}`)}
            >
              <img
                src={
                  movie.Poster && movie.Poster !== "N/A"
                    ? movie.Poster
                    : videoClipImage
                }
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
  );
};

export default SearchPage;
