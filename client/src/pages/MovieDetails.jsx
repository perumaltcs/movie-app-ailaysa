import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';

import videoClipImage from "../assets/video-clip-image.png";

const MovieDetails = () => {
    const { id } = useParams();

    const location = useLocation()
    const navigate = useNavigate()

    const category = location?.state?.genreCategory || "action"

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const [searchKeyword, setSearchKeyword] = useState(category || "action");
    const [searchResults, setSearchResults] = useState([]);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [totalRecordCount, setTotalRecordCount] = useState(0);
    const itemsPerPage = 10;

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

        return () => {
        setSearchResults([]);
        };
    }, [searchKeyword, currentPageNumber]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const result = await axios.get(
                `https://www.omdbapi.com/?apikey=21969482&i=${id}`
            );

            if (result.data.Response === "True") {
                setData(result.data);
            } else {
                setData(null);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
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

    useEffect(() => {
        fetchData();

        return () => {
            setData(null);
        };
    }, [id]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading">
                    <RotatingLines
                        visible={true}
                        height="96"
                        width="96"
                        color="#ED7014"
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                    />
                </div>
            </div>
        );
    }

    if (!data) {
        return <div className="error-message">Movie details not found.</div>;
    }

    return (
        <>
        <div className="movie-details-container">
            <div className="movie-details-poster">
                <img
                    src={data.Poster && data.Poster !== "N/A" ? data.Poster : videoClipImage}
                    alt={data.Title}
                />
            </div>
            <div className="movie-details">
                <h1 className="movie-details-title">{data.Title}</h1>
                <p className="movie-plot">{data.Plot}</p>
                <div className="movie-info">
                    <p><span>Genre:</span> {data.Genre}</p>
                    <p><span>Released:</span> {data.Released}</p>
                    <p><span>IMDB Rating:</span> {data.imdbRating}</p>
                    <p><span>Director:</span> {data.Director}</p>
                    <p><span>Writer:</span> {data.Writer}</p>
                    <p><span>Actors:</span> {data.Actors}</p>
                </div>
            </div>
        </div>

        <div style={{margin: "30px 50px"}}>
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
                        onClick={() => navigate(`/movie-details/${movie.imdbID}`)}
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

export default MovieDetails;
