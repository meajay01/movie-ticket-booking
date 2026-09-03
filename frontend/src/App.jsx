import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import SeatSelection from "./pages/SeatSelection";
import MyBookings from "./pages/MyBookings";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/movies" element={<Movies />} />

        <Route path="/movies/:id" element={<MovieDetails />} />

        <Route
          path="/seat-selection/:id"
          element={<SeatSelection />}
        />

        <Route
          path="/seats/:id"
          element={<SeatSelection />}
        />

        <Route
          path="/my-bookings"
          element={<MyBookings />}
        />
      </Routes>
    </>
  );
}

export default App;