import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import MenuIcon from "@mui/icons-material/Menu";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MovieCreationTwoToneIcon from "@mui/icons-material/MovieCreationTwoTone";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import FastfoodIcon from "@mui/icons-material/Fastfood";
// import CreditCardIcon from "@mui/icons-material/CreditCard";
import AirlineSeatLegroomExtraIcon from "@mui/icons-material/AirlineSeatLegroomExtra";
import DashHeader from "./DashHeader";
import { createContext, useEffect, useState } from "react";
import { decodeToken } from "react-jwt";

// create useContext to send api fetch data to dash header
const Context = createContext();

const DashNav = () => {
  const auth = localStorage.getItem("userInfo");
  const navigate = useNavigate();

  useEffect(() => {
    // if user is available then display function display data of user
    if (auth) {
      fetchUserData();
    } else {
      alert("You have not added! Please Signup");
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);
  useEffect(() => {
    if (auth) {
      const { exp } = decodeToken(JSON.parse(auth).authToken);
      const expiresIn = exp * 1000 - Date.now();

      const timeoutId = setTimeout(() => {
        fetch("http://localhost:4400/api/auth/autologout", {
          method: "GET",
          headers: { Authorization: `${JSON.parse(auth).authToken}` },
        })
          .then((response) => response.json())
          .then((data) => {
            // Logout logic here (clear localStorage, navigate to login page, etc.)
            localStorage.removeItem("userInfo");
            navigate("/");
          })
          .catch((error) => console.error("Auto-logout error:", error));
      }, expiresIn);

      return () => clearTimeout(timeoutId);
    }
  }, [auth, navigate]);

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

  // state for user handle data with useState
  const [stateUser, setStateUser] = useState({
    name: "",
    username: "",
    picture: "",
  });

  // click on hamburger icon close and hide of class of sidebar
  // /*
  const siderbarHide = () => {
    document
      .querySelector(".dash-aside")
      .classList.toggle("asiderbar-hide-open");
  };
  // */
  const logoutValidation = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="dash-main">
      <Context.Provider value={stateUser}>
        {/* Header navbar */}
        <DashHeader />
      </Context.Provider>

      {/* toggle hamburger icon for aside bar left to right */}
      <div className="toggle-hamburger" onClick={siderbarHide}>
        <MenuIcon
          sx={{
            color: "rgb(239 255 0 / 88%)",
            fontSize: "2.5rem",
          }}
        />
      </div>
      {/* aside bar */}
      <div className="dash-aside">
        {/* for user details */}
        {/* <div className="user-info">
          <div className="logo-name">
            <img src={stateUser.picture} alt="Does'nt" />
            <div className="username">
              <h2>{stateUser.name}</h2>
              <h2>{stateUser.username}</h2>
            </div>
          </div>
          <div className="user-buying">
            <span className="balance">Balance</span>
            <div className="credit">
              <i>
                <CreditCardIcon />
              </i>
              <span>$ pricevalue</span>
            </div>
          </div>
        </div> */}
        {/* aside bar left side */}
        <ul className="dash_ulist">
          <li className="active">
            <HomeRoundedIcon />
            <Link to="/dashHome">
              <span>Home</span>
            </Link>
          </li>
          <li>
            <MovieCreationTwoToneIcon />
            <Link to="/dashMovie">
              <span>Movies</span>
            </Link>
          </li>
          <li>
            <HistoryIcon />
            <Link to="/movies">
              <span>Buy Tickets</span>
            </Link>
          </li>
          <li>
            <FastfoodIcon />
            <Link to="/dashfoodrinks">
              <span>Food and Drinks</span>
            </Link>
          </li>
          <li>
            <AirlineSeatLegroomExtraIcon />
            <Link to="/dashsetting">
              <span>Setting</span>
            </Link>
          </li>
          <li>
            <LogoutIcon />
            <Link to="/" onClick={logoutValidation}>
              <span>Logout</span>
            </Link>
          </li>
          {/* <li>
            <Link to="/" onClick={logoutValidation}>
              Logout ({JSON.parse(auth).name})
            </Link>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default DashNav;
export { Context };
