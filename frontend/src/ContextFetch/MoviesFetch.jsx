import { useEffect, useState } from "react";
import movieContext from "./movieContext";
import axios from "axios";

const MoviesFetch = (props) => {
  const [state, setState] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query

  // const [selectedDay, setSelectedDay] = useState("Monday");
  // const [selectedTime, setSelectedTime] = useState("2pm");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4400/api/adminamovie/fetchmovie"
        );
        setState(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const filterMovies = () => {
    return Array.from(state).filter((movie) => {
      movie.movietitle.toLowerCase().includes(searchQuery.toLowerCase());
    });
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    console.log(
      Array.from(state).filter(
        (movie) =>
          movie.movietitle.toLowerCase().includes(searchQuery.toLowerCase()) ===
          e.target.value
      )
    );
  };

  // const selectDay = (day) => {
  //   setSelectedDay(day);
  // };

  // const selectTime = (time) => {
  //   setSelectedTime(time);
  // };

  // Avoid creating a new function inside render (return statement)
  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4400/api/adminamovie/fetchmovie"
      );
      setState(response.data);
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  };

  return (
    <movieContext.Provider
      value={{
        state, // state variable for movies
        fetchMovies, // fetch movie function include in all files
        handleSearchChange, // Provide the search change handler
        searchQuery, // Provide the search query
        filterMovies,
      }}
    >
      {props.children}
    </movieContext.Provider>
  );
};

export default MoviesFetch;
