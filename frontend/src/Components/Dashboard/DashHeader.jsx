import { Link, useNavigate } from "react-router-dom";
import CinetLogo from "../../assets/cine-t.png";
import SearchIcon from "@mui/icons-material/Search";
import { useContext, useEffect, useState } from "react";
import { Context } from "./DashNav";

const DashHeader = () => {
  // usecontext use for fetch api data with the help of contextApi
  const context = useContext(Context);
  const [state, setState] = useState("");

  useEffect(() => {
    setState(context);
  }, [context]);
  // const auth = localStorage.getItem("userInfo");
  const navigate = useNavigate();

  // auth value of localstorage of user is available that's show the link of user to logout
  const logoutValidation = () => {
    localStorage.clear();
    navigate("/");
  };
  const userListShow = () => {
    let userList = document.getElementById("listUser");
    userList.classList.toggle("show_userlist");
  };
  const DayNightMode = () => {
    document.body.classList.toggle("body-bg-light");
  };

  return (
    <>
      {/* dashboard header */}
      <div className="dash-header">
        {/* Logo to home */}
        <div className="logo">
          <img src={CinetLogo} alt="Does'nt Show" />
          <Link>
            <h1>Cine-t</h1>
          </Link>
        </div>
        {/* search bar */}
        <div className="search" id="search">
          <i>
            <SearchIcon />
          </i>
          <input type="search" placeholder="Type to Search..." />
        </div>
        <div className="right">
          {/* dark theme */}
          <div className="dark-mode">
            <input
              type="checkbox"
              id="toggle_checkbox"
              onClick={DayNightMode}
            />

            <label htmlFor="toggle_checkbox">
              <div id="star">
                <div className="star" id="star-1">
                  ★
                </div>
                <div className="star" id="star-2">
                  ★
                </div>
              </div>
              <div id="moon"></div>
            </label>
          </div>
          {/* user logo setting */}
          <div className="user-setting">
            {/* icon of user to click an add class */}
            <div className="user-image" id="userImage">
              <img src={state.picture} alt="Does'nt" onClick={userListShow} />
            </div>
            {/* new class of setting */}
            <div className="setting-list" id="listUser">
              <ul className="setting-list-user">
                <li>
                  <Link> Setting</Link>
                </li>
                <li>
                  <Link> Add </Link>
                </li>
                <li>
                  <Link to="/" onClick={logoutValidation}>
                    Logout ({state.name})
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashHeader;
