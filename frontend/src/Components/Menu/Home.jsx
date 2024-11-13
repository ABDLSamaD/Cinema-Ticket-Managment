import Slider from "../Slider/Slider";
import ImageSliderLittle from "../Slider/ImageSliderLittle";
import Footer from "../Footer/Footer";
import "../Styles.css";
import { createContext } from "react";
import Navbar from "../Header/Navbar";
import { Link } from "react-router-dom";

const Heading = createContext();

const Home = () => {
  // scroll to botto some y axis add a class of animation of slider
  /*
  window.addEventListener("scroll", () => {
    document
      .querySelector("#second .container")
      .classList.toggle("second-animation", scrollY > 80);
    // document.querySelector("#third .container").classList.toggle("third-animation", scrollY > 120);
    document
      .querySelector("#third .container")
      .classList.toggle("third-animation", scrollY > 120);
  });*/

  return (
    <>
      <Navbar />
      <div id="home" className="top">
        {/* Starting Home Screen */}
        <div id="first">
          <div className="container wrap center">
            <div className="info-start">
              <div className="migrate">
                <img
                  src="https://1000logos.net/wp-content/uploads/2023/04/Visual-Studio-logo.png"
                  alt="Not Show"
                />
                <span>Cinema Mangement</span>
              </div>
              <div className="heading-start">
                <h1>
                  Welcome to Cinema
                  <span style={{ color: "#51a11a" }}>Ticket </span>
                  <br />
                  Managment
                </h1>
                <h2>
                  A cinema ticket management system for online ticketing through
                  on website.
                </h2>
              </div>
              <Link to="/movies">
                <button>Buy Tickets</button>
              </Link>
            </div>
          </div>
        </div>

        {/* Image Slider data of movies */}
        <div id="second" className="slider center">
          <div className="container">
            <h1>Movies</h1>
            <Slider />
          </div>
        </div>
        {/* latest Movies Data */}
        <div id="third" className="latest-movies">
          <div className="container wrap center">
            <Heading.Provider value={"Latest Movies"}>
              <ImageSliderLittle />
            </Heading.Provider>
          </div>
        </div>
        {/* Updated Movies Data */}
        <div id="fourth" className="comming-movies">
          <div className="container wrap center">
            <Heading.Provider value={"Coming Soon"}>
              <ImageSliderLittle />
            </Heading.Provider>
          </div>
        </div>
        {/* Footer Section */}
        <Footer />
      </div>
    </>
  );
};

export default Home;
export { Heading };
