import React, { useEffect, useState } from "react";

const TikcetMovie = () => {
  const auth = localStorage.getItem("userInfo");
  const [stateUser, setStateUser] = useState([]);
  // get user data to show that he would signup or login
  async function fetchUserData() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `${JSON.parse(auth).authToken}`);
    const response = await fetch(
      "http://localhost:4400/api/cinema/seat-details",
      {
        method: "get",
        headers: myHeaders,
      }
    );
    const data = await response.json();
    setStateUser(data);
  }

  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <>
      {Array.from(stateUser).map((value) => {
        return (
          <div className="ticket-card" key={value._id}>
            <h2>Movie {value.selectedMovie} </h2>
            <div className="col-1 all-col">
              <p>Selected Seats</p>
              <span> {value.selectedSeats} </span>
            </div>
            <div className="col-2 all-col">
              <p>Seats Name</p>
              <div className="seats">
                {value.seatsName.map((seat) => {
                  return <span key={seat._id}>{seat}</span>;
                })}
              </div>
            </div>
            <div className="col-3 all-col">
              <p>Total price</p>
              <span> {value.moviePrice} </span>
            </div>
            <div className="random-id start">{value.randomId}</div>
            <div className="date-generate start"> Date Slip: {value.date}</div>
          </div>
        );
      })}
    </>
  );
};

export default TikcetMovie;
