import "./Navbar.css";
import Logo from "../../assets/cine-t.png";
import MenuButton from "@mui/icons-material/Menu";
import CloseButton from "@mui/icons-material/Close";
import SearchBar from "@mui/icons-material/Search";
import Tooltip from "@mui/material/Tooltip";
import Menu from "./Menu.jsx";
import "../Styles.css";
import { Link } from "react-router-dom";
import movieContext from "../../ContextFetch/movieContext.jsx";
import { useContext } from "react";

const Navbar = () => {
  const context = useContext(movieContext);
  const { filterMovies, searchQuery, handleSearchChange } = context;

  const auth = localStorage.getItem("userInfo");
  // Add a full width height class for search-bar with useState()
  const SearchBarOpen = () => {
    let searcBoxOpen = document.querySelector(".search-box");
    searcBoxOpen.style.transform = "translateY(0)";
  };
  // remove class from searchbox with useState()
  const SearchBarClose = () => {
    let searchBoxClose = document.querySelector(".search-box");
    searchBoxClose.style.transform = "translateY(-100%)";
    // setSearchV(closeSearchBox);
  };
  const ToggleMenuClass = () => {
    let menu = document.querySelector(".menu");
    menu.classList.toggle("active-menu");
  };
  // console.log(seacrV);

  window.addEventListener("scroll", () => {
    document
      .querySelector(".navbar")
      .classList.toggle("down_nav", window.scrollY > 20);
  });

  return (
    <div className="navbar" id="navbar">
      <div className="container">
        <header>
          <div className="logo">
            <img src={Logo} alt="Does'nt show" />
            <h1>
              <Link to="/">Cine-T</Link>
            </h1>
          </div>
          <div className="searchbar">
            {auth ? (
              <button>
                <Link to="/dashHome">Dashboard</Link>
              </button>
            ) : (
              <button className="btn login-btn">
                <Link to="/signin">Signin</Link>
              </button>
            )}
            <Tooltip title="Search">
              <i className="click_search" onClick={SearchBarOpen}>
                <SearchBar />
              </i>
            </Tooltip>
            <div className="search-box">
              <div className="container">
                <h1>SearchBox of cinema ticket managment</h1>
                <div className="search-menu">
                  <span>
                    <SearchBar />
                  </span>
                  <input
                    type="search"
                    placeholder="Search here..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <button className="btn btn-search" onClick={filterMovies}>
                    Search
                  </button>
                </div>
                <div className="close_icon">
                  <Tooltip title="Close">
                    <span className="close" onClick={SearchBarClose}>
                      <CloseButton />
                    </span>
                  </Tooltip>
                </div>
                <div className="movie-list">
                  <h2>Search Results</h2>
                  {filterMovies().map((movie) => (
                    <div key={movie._id} className="movieslist">
                      <h1 style={{ color: "red" }}>{movie.movietitle}</h1>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <nav>
          <div className="toogle_button">
            <i id="open_btn" onClick={ToggleMenuClass}>
              <MenuButton />
            </i>
          </div>
          <Menu />
        </nav>
      </div>
    </div>
  );
};
export default Navbar;
