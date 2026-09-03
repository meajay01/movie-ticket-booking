import { useNavigate, useParams } from "react-router-dom";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="details-page">
      <div className="details-card">
        
        <div className="details-poster">
          <img
            src="https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg"
            alt="Avengers: Endgame"
          />
        </div>

        <div className="details-content">
          <p className="details-label">MOVIE DETAILS</p>

          <h1>Avengers: Endgame</h1>

          <div className="details-rating">
            ⭐ <strong>8.4</strong>/10
          </div>

          <p className="details-description">
            The Avengers fight to reverse the damage caused by Thanos.
            Earth's mightiest heroes must come together for one final
            battle to restore what was lost.
          </p>

          <div className="details-info">
            <div>
              <span>🎭</span>
              <strong>Genre</strong>
              <p>Action</p>
            </div>

            <div>
              <span>🌐</span>
              <strong>Language</strong>
              <p>English</p>
            </div>

            <div>
              <span>⏱️</span>
              <strong>Duration</strong>
              <p>3h 2m</p>
            </div>
          </div>

          <button
            className="book-btn"
            onClick={() => navigate(`/seat-selection/${id}`)}
          >
            Book Now 🎟️
          </button>

          <button
            className="back-btn"
            onClick={() => navigate("/movies")}
          >
            ← Back to Movies
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;