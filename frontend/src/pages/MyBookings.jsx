import { useEffect, useState } from "react";
import axios from "axios";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/bookings/my-bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBookings(response.data);
      } catch (error) {
        console.log("Error fetching bookings:", error);
        alert(
          error.response?.data?.message || "Failed to fetch bookings"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="bookings-page">
        <h2>Loading bookings...</h2>
      </div>
    );
  }

  return (
    <div className="bookings-page">
      <h1>My Bookings 🎟️</h1>

      {bookings.length === 0 ? (
        <div className="no-bookings">
          <h2>No bookings found</h2>
          <p>You have not booked any movie yet.</p>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div className="booking-card" key={booking._id}>
              <div className="booking-header">
                <h2>{booking.movie?.title}</h2>
                <span className="booking-status">
                  {booking.status}
                </span>
              </div>

              <div className="booking-details">
                <p>
                  <strong>Seats:</strong>{" "}
                  {booking.seats.join(", ")}
                </p>

                <p>
                  <strong>Date:</strong> {booking.showDate}
                </p>

                <p>
                  <strong>Time:</strong> {booking.showTime}
                </p>

                <p>
                  <strong>Total Amount:</strong>{" "}
                  ₹{booking.totalAmount}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;