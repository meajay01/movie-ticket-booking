import { Link } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");

  return (
    <nav>
      <h2>🎬 MovieBook</h2>

      <div>
        <Link to="/">Home</Link>{" "}
        <Link to="/movies">Movies</Link>{" "}

        {token ? (
          <Link to="/my-bookings">My Bookings</Link>
        ) : (
          <>
            <Link to="/login">Login</Link>{" "}
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;