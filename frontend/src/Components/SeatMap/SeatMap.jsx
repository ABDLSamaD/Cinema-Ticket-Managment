import { useState } from "react";
import clsx from "clsx";
import MoviesList from "./../Slider/SliderImagesDetails";
import "./Seatmap.css";
import { useParams } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const SeatMap = ({ data }) => {
  // id of movie
  const { id } = useParams();

  // seat coccupied movie list
  const movies = data;
  // console.log(movies.price);

  const seats = Array.from({ length: 8 * 8 }, (_, i) => i);

  const [selectedMovie, setSelectedMovie] = useState(MoviesList[0]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  // this state for which movie user selected the result show with id

  // function of movies
  // eslint-disable-next-line react/prop-types
  function Movies({ onChange }) {
    return (
      <div className="Movies">
        <label htmlFor="movie">Pick a movie</label>
        <select
          id="movies"
          // eslint-disable-next-line react/prop-types
          value={data.MovieTitle}
          onChange={(e) => {
            onChange(
              // eslint-disable-next-line react/prop-types
              movies.find((movie) => movie.MovieTitle === e.target.value)
            );
          }}
        >
          {/* eslint-disable-next-line react/prop-types */}
          <option key={data.id} value={data.MovieTitle}>
            {/* eslint-disable-next-line react/prop-types */}
            {data.MovieTitle} ({data.price} rupee)
          </option>
        </select>
      </div>
    );
  }

  // function showcase
  function ShowCase() {
    return (
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
    );
  }
  // function cinema
  // eslint-disable-next-line react/prop-types
  function Cinema({ movie, selectedSeats, onSelectedSeatsChange }) {
    function handleSelectedState(seat) {
      // eslint-disable-next-line react/prop-types
      const isSelected = selectedSeats.includes(seat);
      if (isSelected) {
        onSelectedSeatsChange(
          // eslint-disable-next-line react/prop-types
          selectedSeats.filter((selectedSeat) => selectedSeat !== seat)
        );
      } else {
        onSelectedSeatsChange([...selectedSeats, seat]);
      }
    }

    return (
      <div className="Cinema">
        {MoviesList.map((value) => {
          if (id == value.id) {
            return (
              <div className="screen" key={value.id}>
                <img src={value.Image} alt={value.MovieTitle} />;
              </div>
            );
          }
        })}

        <div className="seats">
          {seats.map((seat) => {
            console.log(seat);
            // eslint-disable-next-line react/prop-types
            const isSelected = selectedSeats.includes(seat);
            // eslint-disable-next-line react/prop-types
            const isOccupied = movie.occupied.includes(seat);
            return (
              <span
                tabIndex="0"
                key={seat}
                className={clsx(
                  "seat",
                  isSelected && "selected",
                  isOccupied && "occupied"
                )}
                onClick={isOccupied ? null : () => handleSelectedState(seat)}
                onKeyPress={
                  isOccupied
                    ? null
                    : (e) => {
                        if (e.key === "Enter") {
                          handleSelectedState(seat);
                        }
                      }
                }
              />
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div id="seatmap">
      <h1>Seat map</h1>
      <div className="App">
        <Movies
          movie={selectedMovie}
          onChange={(movie) => {
            setSelectedSeats([]);
            setSelectedMovie(movie);
          }}
        />
        <ShowCase />
        <Cinema
          movie={selectedMovie}
          selectedSeats={selectedSeats}
          onSelectedSeatsChange={(selectedSeats) =>
            setSelectedSeats(selectedSeats)
          }
        />

        <p className="info-seat">
          You have selected <br />
          <span className="count">{selectedSeats}</span> seats for the price of
          <span className="total">
            {selectedSeats && selectedSeats * selectedMovie.price + " rupee"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SeatMap;
