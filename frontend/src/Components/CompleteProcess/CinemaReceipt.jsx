/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import movieContext from "../../ContextFetch/movieContext";

const CinemaReceipt = (props) => {
  // localstorage value get of user has selected seat of array
  const userDetailsSeat = localStorage.getItem("selectedSeats");

  const randomNumberOfUser_Id = localStorage.getItem("randomnumberofseats");

  // userdetails of signup user
  const auth = localStorage.getItem("userInfo");

  // movies data from context api
  const context = useContext(movieContext);
  const { state, fetchMovies } = context;
  // state for movie id and set inside a function of map to set the id in setState()
  const [movieData, setMovieData] = useState("");

  // parameter from MeunAdd file of routing to this component
  const { movieId } = useParams();

  useEffect(() => {
    fetchMovies();
    // if user is available then display function display data of user
    if (auth) {
      fetchUserData();
    }

    // what /movies/:id is selected user
    Array.from(state).map((value) => {
      if (value._id === movieId) {
        return setMovieData(value);
      }
    });
    // Check if userDetailsSeat is not null before parsing
    if (userDetailsSeat) {
      const parsedSeats = JSON.parse(userDetailsSeat);
      setUserSeat(parsedSeats);
    }
  }, [userDetailsSeat]);

  // state for user handle data with useState
  const [stateUser, setStateUser] = useState({
    name: "",
    username: "",
    picture: "",
    email: "",
  });

  // get user data to show that he would signup or login
  const fetchUserData = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `${JSON.parse(auth).authToken}`);
    const response = await fetch("http://localhost:4400/api/auth/getuser", {
      method: "POST",
      headers: myHeaders,
    });
    const data = await response.json();
    setStateUser(data.user);
  };

  const [userSeat, setUserSeat] = useState([]);

  return (
    <div className="receipt">
      <div className="row">
        <div className="user-details">
          <div className="user-img">
            <img src={stateUser.picture} alt="Does'nt" />
          </div>
          <div className="user-info">
            <p>{stateUser.name}</p>
            <p>{stateUser.username}</p>
            <p>{stateUser.email}</p>
            <p>Number</p>
          </div>
        </div>
        <div className="payment">
          <div className="method">
            <span className="payment-method">Payment Method</span>
            <span>Slip Shown in Counter</span>
          </div>
          <div className="cardn">
            <span className="card-number">Card Number</span>
            <span>Null</span>
          </div>
        </div>
        <div className="amount">
          <div className="campaign">
            <span className="campaign-method">Compaign</span>
            <span>In Rupee</span>
          </div>
          <div className="pay">
            <span className="amount-pay">Amount</span>
            {userSeat.map((value) => {
              return <span key={value._id}> {value.price} </span>;
            })}
            <span style={{ paddingTop: "2px", borderTop: ".3px solid grey" }}>
              {props.equalPrice}
            </span>
          </div>
        </div>
        <div className="seat-details">
          <span>Your Selected Movie is ( {movieData.movietitle} )</span>
          {userSeat.map((value) => {
            return (
              <span className="s-details" key={value._id}>
                SeatName: {value.seatName}
              </span>
            );
          })}
          <p
            style={{
              fontSize: "18px",
              color: "rgb(0 176 255)",
              padding: "10px 0",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            ID: ({randomNumberOfUser_Id})
          </p>
        </div>
        <div className="cinema-detail">
          <span>Etc Cinema</span>
          <div className="slip-signature">
            <span style={{ fontSize: "14px" }}>
              This is an Compuerized Genrated Slip, Signature Not Required
            </span>
          </div>
          <div
            className="time-now"
            style={{ marginTop: "10px", color: "rgb(0 176 255)" }}
          >
            Slip in ({new Date().toLocaleTimeString()})
          </div>
        </div>

        <div className="comming-cinema">
          <p>
            Thankyou <span>For Comming Our Website For Booking an ticket</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CinemaReceipt;
