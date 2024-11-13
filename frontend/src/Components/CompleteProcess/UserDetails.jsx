// import React from 'react'
import Box from "@mui/material/Box";
import { useLocation, useParams } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import "./ProcessAll.css";
import { useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import MovieData from "../Slider/SliderImagesDetails";

// eslint-disable-next-line react/prop-types
const UserDetails = () => {
  // naviagtion hook
  // const navigate = useNavigate();
  const auth = localStorage.getItem("userInfo");
  // state for movie id and set inside a function of map to set the id in setState()
  // const [movieData, setMovieData] = useState("");

  // console.log(hello);

  const Location = useLocation();
  const { movieId } = useParams();

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    city: "",
  });

  const onChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  // function pass from there there is an user movie details
  const userHandler = async (e) => {
    e.preventDefault();
    if (auth) {
      try {
        const { name, email, phoneNumber, city } = userDetails;
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `${JSON.parse(auth).authToken}`);
        myHeaders.append("Content-Type", "application/json");
        const response = await fetch(
          "http://localhost:4400/api/movies/userdetails",
          {
            method: "post",
            body: JSON.stringify({ name, email, phoneNumber, city }),
            headers: myHeaders,
          }
        );
        const data = await response.json();
        alert(data.message);
        localStorage.setItem("moviesuser", JSON.stringify(response));
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    } else {
      alert("signup please");
    }
  };

  return (
    <div className="contact-details">
      {Location.pathname === `/process/${movieId}` ? (
        // user can step wise step process of movies ticket then show details of tickets
        <>
          <h1>User Details</h1>
          <form className="form-user-details" onSubmit={userHandler}>
            <div className="input-box">
              <Box
                sx={{ display: "flex", alignItems: "flex-end", color: "white" }}
              >
                <AccountCircle
                  sx={{ color: "#14a", mr: 1, my: 0.5, fontSize: "2em" }}
                />
                <input
                  type="text"
                  name="name"
                  onChange={onChange}
                  placeholder="Enter your name"
                />
              </Box>
            </div>
            <div className="input-box">
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <AccountCircle
                  sx={{ color: "#14a", mr: 1, my: 0.5, fontSize: "2em" }}
                />
                <input
                  type="email"
                  name="email"
                  onChange={onChange}
                  placeholder="Enter your email"
                />
              </Box>
            </div>
            <div className="input-box">
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <AccountCircle
                  sx={{ color: "#14a", mr: 1, my: 0.5, fontSize: "2em" }}
                />
                <input
                  type="number"
                  name="phoneNumber"
                  onChange={onChange}
                  placeholder="Enter your Number"
                />
              </Box>
            </div>
            <div className="input-box">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <AccountCircle
                  sx={{ color: "#14a", mr: 1, my: 0.5, fontSize: "2em" }}
                />
                <input
                  type="text"
                  name="city"
                  onChange={onChange}
                  placeholder="City"
                />
              </Box>
            </div>
            <button type="submit">Submit</button>
          </form>
        </>
      ) : (
        // and not have get access id or direct fraud with url to get access then this error show
        <h2 style={{ color: "red", fontSize: "4vw" }}>Get Access Id</h2>
      )}
    </div>
  );
};

export default UserDetails;
