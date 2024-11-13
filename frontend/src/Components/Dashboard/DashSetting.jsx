import React, { useEffect, useState } from "react";
import DashNav from "./DashNav";
import TikcetMovie from "./TikcetMovie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DashSetting = () => {
  const auth = localStorage.getItem("userInfo");
  const navigate = useNavigate();

  // get user data to show that he would signup or login
  async function fetchUserData() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `${JSON.parse(auth).authToken}`);
    const response = await fetch("http://localhost:4400/api/auth/getuser", {
      method: "POST",
      headers: myHeaders,
    });
    const data = await response.json();
    setStateUser(data.user);
  }

  useEffect(() => {
    if (auth) {
      fetchUserData();
    } else {
      alert("You have not added! Please Signup");
      navigate("/");
    }
    setTimeout(() => {
      settingshow.style.display = "block";
      removeloader.remove();
      // if user is available then display function display data of user
    }, 2000);
  }, [auth]);

  // state for user handle data with useState
  const [stateUser, setStateUser] = useState({
    name: "",
    username: "",
    picture: "",
    email: "",
    date: "",
  });

  const deleteAccount = async () => {
    const prompts = prompt("Are You sure want to delete your account");
    if (prompts === "yes") {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `${JSON.parse(auth).authToken}`);
        myHeaders.append("Content-Type", "application/json");
        const response = await fetch(
          "http://localhost:4400/api/auth/deleteaccount",
          {
            method: "delete",
            headers: myHeaders,
          }
        );
        const datas = await response.json();
        alert(datas.message);
        localStorage.clear();
        navigate("/");
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    } else {
      alert("not too succed");
    }
  };

  return (
    <>
      <DashNav />
      <div
        id="settingshow"
        className="absolute_allDash"
        style={{ display: "none", left: "20%", top: "25%" }}
      >
        {/* user details */}
        <div
          className="user-details"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            color: "#ddf",
          }}
        >
          <div className="user-image">
            <img
              src={stateUser.picture}
              alt={stateUser.name}
              style={{ width: "300px", height: "300px", objectFit: "contain" }}
            />
          </div>
          <div className="user-info">
            <h1 className="info-dash">
              Name: <span> {stateUser.name} </span>
            </h1>
            <h1 className="info-dash">
              Username: <span> {stateUser.username} </span>
            </h1>
            <h1 className="info-dash">
              Email:
              <span style={{ fontSize: "20px" }}> {stateUser.email} </span>
            </h1>
            <h1 className="info-dash">
              Created Acc on:
              <span style={{ fontSize: "20px" }}>{stateUser.date}</span>
            </h1>
          </div>
        </div>
        <button className="btn" onClick={deleteAccount}>
          Delet Account
        </button>
        {/* Movie Ticket */}
        <div className="movie-ticket">
          <h1>Slip Movies</h1>
          <div className="row">
            <TikcetMovie />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashSetting;
