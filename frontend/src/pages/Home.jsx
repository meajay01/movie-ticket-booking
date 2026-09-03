import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">

      <h1>🎬 Welcome to MovieBook</h1>

      <p>
        Book your favorite movies quickly and easily.
      </p>

      <div>
        <Link to="/movies">
          <button>Browse Movies</button>
        </Link>

        <Link to="/login">
          <button>Login</button>
        </Link>

        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>

      <hr />

      <h2>Why MovieBook?</h2>

      <p>🎟️ Easy Seat Selection</p>
      <p>🔐 Secure Login</p>
      <p>⚡ Fast Booking</p>
      <p>📋 Manage Your Bookings</p>

    </div>
  );
}

export default Home;