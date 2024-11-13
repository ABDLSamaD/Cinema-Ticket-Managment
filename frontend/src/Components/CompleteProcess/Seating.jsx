// import React from 'react'
import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "../SeatMap/Seatmap.css";
import Navbar from "../Header/Navbar";
import axios from "axios";
import movieContext from "../../ContextFetch/movieContext";
import Alert from "../Alert";

const Seating = () => {
  // state for movie id and set inside a function of map to set the id in setState()
  const [movieData, setMovieData] = useState("");
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [occupiedseat, setOccupiedSeat] = useState([]);
  const [loader, setLoader] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  // context api from context file of movie data
  const context = useContext(movieContext);
  const { state, fetchMovies } = context;

  // parameter from MeunAdd file of routing to this component
  const { movieId } = useParams();
  const Location = useLocation();

  // random number or string of user to shows slip of id in cinema
  const str = "cine";
  const random = str + Math.floor(Math.random() * 10000000) + 1;

  const fetchSeats = () => {
    axios
      .get("http://localhost:4400/api/seat/seatmap")
      .then((response) => {
        // console.log("Fetched seats:", response.data);
        setSeats(response.data);
      })
      .catch((error) => console.error("Error fetching seats:", error));
  };

  useEffect(() => {
    fetchMovies();
    fetchSeats();

    // Fetch user information (you need to replace this with your actual user authentication code)
    const currentUserInfo = localStorage.getItem("userInfo");

    // Check if the current user is different from the previous user
    const storedUserInfo = localStorage.getItem("selectedSeatsUserInfo");
    if (currentUserInfo !== storedUserInfo) {
      // Clear selected seats if the user is different
      setSelectedSeats([]);
      setOccupiedSeat([]);
      localStorage.setItem("selectedSeatsUserInfo", currentUserInfo);
    }

    // /movies
    Array.from(state).forEach((value) => {
      if (movieId === value._id) {
        setMovieData(value);
        const occupiedseats = value.occupiedSeats.map((seat) => {
          return seat;
        });
        setOccupiedSeat(occupiedseats);
        return null;
      }
    });
  }, [movieId]);

  function handleSeatClick(seat) {
    if (!seat.occupied) {
      // Check if the seat is already selected
      const isAlreadySelected = selectedSeats.find((s) => s._id === seat._id);

      if (isAlreadySelected) {
        // If the seat is already selected, remove it from the selectedSeats array
        const updatedSelectedSeats = selectedSeats.filter(
          (s) => s._id !== seat._id
        );
        setSelectedSeats(updatedSelectedSeats);

        // Update the state of seats
        const updatedSeats = seats.map((s) =>
          s._id === seat._id ? { ...s, selected: false } : s
        );
        setSeats(updatedSeats);
      } else {
        // If the seat is not already selected, add it to the selectedSeats array
        const updatedSelectedSeats = [...selectedSeats, seat];
        setSelectedSeats(updatedSelectedSeats);

        // Update the state of seats
        const updatedSeats = seats.map((s) =>
          s._id === seat._id ? { ...s, selected: true } : s
        );
        setSeats(updatedSeats);
      }
    } else {
      // Seat is already occupied, show a message or handle accordingly
      console.log("This seat is already occupied and cannot be selected.");
    }
  }

  function calculateTotalPrice() {
    // Calculate the total price based on selected seats
    return selectedSeats.reduce((total, seat) => total + seat.price, 0);
  }

  const saveSelectionToLocalStorage = async () => {
    try {
      setLoader(true);

      // Save selected seats to local storage
      localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
      localStorage.setItem("randomnumberofseats", random);

      // Save user information to local storage
      const currentUserInfo = localStorage.getItem("userInfo");
      localStorage.setItem("selectedSeatsUserInfo", currentUserInfo);

      // Check if selected seats are still available
      const availableSeats = seats.filter((seat) => !seat.occupied);
      const selectedSeatIds = selectedSeats.map((seat) => seat._id);

      const isAnySelectedSeatOccupied = selectedSeatIds.some((seatId) =>
        availableSeats.find((seat) => seat._id === seatId && seat.occupied)
      );

      if (isAnySelectedSeatOccupied) {
        alert(
          "One or more selected seats are already booked. Please choose other seats."
        );
        return;
      }

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      // Make the PUT request to update occupied seats
      const response = await fetch(
        `http://localhost:4400/api/adminamovie/updateoccupiedseats/${movieId}`,
        {
          method: "put",
          body: JSON.stringify({ selectedSeats, userInfo: currentUserInfo }),
          headers: myHeaders,
        }
      );
      const datas = await response.json();
      if (response.status === 200) {
        // Update the occupied seats state
        setShowMessage(true);
        // const updatedOccupiedSeats = selectedSeats.map((seat) => seat._id);
        // setOccupiedSeat(updatedOccupiedSeats);

        setShowAlert(true);
        setShowMessage(datas.message);
      } else {
        alert(datas.message);
        console.log(datas.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {Location.pathname === `/process/${movieId}` ? (
        <>
          <Navbar />
          {/* Alert component */}
          <Alert show={showAlert} message={showMessage} />
          <div id="seatmap">
            {/* <h1>Seat map</h1> */}
            {/* <p key={Seat.id}>{Seat.seatName}</p> */}
            <div className="App">
              {/* movies section */}
              <div className="Movies">
                <label htmlFor="movie">Pick a movie</label>
                <select
                  id="movies"
                  value={movieData.movietitle}
                  onChange={(e) => {
                    const selectedMovie = state.find(
                      (movie) => movie.movietitle === e.target.value
                    );
                    setMovieData(selectedMovie);
                  }}
                >
                  <option key={movieData._id} value={movieData.movietitle}>
                    {movieData.movietitle} ({movieData.price} rupee)
                  </option>
                </select>
                {/* <select
                  name="time"
                  id="time"
                  style={{ position: "absolute", right: "100px", top: "20px" }}
                >
                  <option value="Time">4:00 AM</option>
                  <option value="Time">8:00 AM</option>
                </select> */}
              </div>
              {/* show case */}
              <ul className="ShowCase">
                <li>
                  <span className="seat" /> <small>N/A</small>
                </li>
                <li>
                  <span className="seat selected" /> <small>Selected</small>
                </li>
                <li>
                  <span className="seat occupied" /> <small>Occupied</small>
                </li>
              </ul>
              {/* screen */}
              <div className="Cinema">
                <div className="screen"></div>
                <div className="seats">
                  {seats.map((seat) => {
                    const isOccupied = occupiedseat.includes(seat._id);
                    return (
                      <div
                        className={`seat ${seat.selected ? "selected" : ""} ${
                          isOccupied ? "occupied" : ""
                        }`}
                        key={seat._id}
                        onClick={() => handleSeatClick(seat)}
                      >
                        <div className="name">{seat.seatName}</div>
                      </div>
                    );
                  })}
                </div>
                <p className="info-seat">
                  You have selected {selectedSeats.length} <br />
                  <span className="count"></span> seats for the price of
                  <span className="total"> {calculateTotalPrice()} rupee</span>
                </p>
              </div>
              <button disabled={loader} onClick={saveSelectionToLocalStorage}>
                Save Seats
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="container">Not to succeed</div>
      )}
    </>
  );
};

export default Seating;
