import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function SeatSelection() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState([]);

  const seats = [
    ["A1", "A2", "A3", "A4"],
    ["B1", "B2", "B3", "B4"],
  ];

  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleBooking = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", {
        state: {
          from: `/seats/${id}`,
        },
      });

      return;
    }

    if (selectedSeats.length === 0) {
      alert("Please select at least one seat");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/bookings",
        {
          movie: id,
          seats: selectedSeats,
          showDate: "2026-08-30",
          showTime: "19:00",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      alert("Ticket booked successfully!");

      console.log("Booking:", response.data.booking);

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Booking failed"
      );
    }
  };

  const totalAmount = selectedSeats.length * 200;

  return (
    <div className="seat-page">
      <h1>Select Your Seats 🎟️</h1>

      <p className="movie-id">Movie ID: {id}</p>

      <div className="screen">
        SCREEN
      </div>

      <h2>Select Seats</h2>

      <div className="seat-area">
        {seats.map((row, index) => (
          <div className="seat-row" key={index}>
            {row.map((seat) => (
              <button
                key={seat}
                className={
                  selectedSeats.includes(seat)
                    ? "seat selected"
                    : "seat"
                }
                onClick={() => handleSeatClick(seat)}
              >
                {seat}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="seat-info">
        <span>
          <span className="box available"></span>
          Available
        </span>

        <span>
          <span className="box selected-box"></span>
          Selected
        </span>
      </div>

      <div className="booking-summary">
        <p>
          Selected Seats:{" "}
          {selectedSeats.length > 0
            ? selectedSeats.join(", ")
            : "None"}
        </p>

        <p>
          Total Amount: <strong>₹{totalAmount}</strong>
        </p>

        <button
          className="confirm-btn"
          onClick={handleBooking}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}

export default SeatSelection;