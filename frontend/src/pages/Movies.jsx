import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      /*.then((response) => {
        setMovies(response.data);
      })*/
      .then((response) => {
         console.log("Movies received:", response.data);
           setMovies(response.data);
       })
      .catch((error) => {
        console.log("Error fetching movies:", error);
      });
  }, []);

  return (
    <div className="movies-page">
      <div className="movies-header">
        <h1>Available Movies 🎬</h1>
        <p>Choose your favorite movie and book your seats.</p>
      </div>

      <div className="movie-grid">
        {movies.map((movie) => (
          <div className="movie-card" key={movie._id}>
            
            <div className="movie-poster">
              <img
                src={movie.poster}
                alt={movie.title}
              />
            </div>

            <div className="movie-content">
              <h2>{movie.title}</h2>

              <p className="movie-description">
                {movie.description}
              </p>

              <div className="movie-info">
                <span>🎭 {movie.genre}</span>
                <span>🌐 {movie.language}</span>
                <span>⏱️ {movie.duration}</span>
              </div>

              <div className="movie-rating">
                ⭐ {movie.rating}/10
              </div>

              <Link to={`/movies/${movie._id}`}>
                <button className="details-btn">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;