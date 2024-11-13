// import MovieList from "../Slider/SliderImagesDetails";
import "../Styles.css"; //style of all components in here...
import { Link, useLocation, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import LoadingBar from "react-top-loading-bar";
import Footer from "../Footer/Footer";
import Slider from "../Slider/Slider";
import Navbar from "../Header/Navbar";
import { useContext, useEffect, useState } from "react";
import movieContext from "../../ContextFetch/movieContext";

const Movies = () => {
  const auth = localStorage.getItem("userInfo");
  const context = useContext(movieContext);
  const { state, fetchMovies } = context;
  const [movies, setMovies] = useState("");

  // parameter from MeunAdd file of routing to this component
  const { movieId } = useParams();
  const Location = useLocation();

  useEffect(() => {
    fetchMovies();
    Array.from(state).map((value) => {
      if (value._id === movieId) {
        return setMovies(value);
      }
    });
  }, [state]);

  // Fetch movie details based on 'id' (you can use an API or local data)
  // const movie = MovieList[id - 1];

  // function AnimationRoundeds() {
  //   document
  //     .querySelector(".animation-rounded")
  //     .classList.add("animation-rounded-again");
  // }

  return (
    <>
      <Navbar />
      <div id="movie" className="movies ">
        <LoadingBar height={2} progress={100} color="#f11946" />
        {Location.pathname === `/movies/${movieId}` ? (
          <div className="container">
            <div className="row">
              <div className="image">
                <img src={movies.image} alt={movies.movietitle} />
              </div>
              <div className="info-text">
                <p>
                  Description: <span>{movies.moviedescription}</span>
                </p>
                <p>
                  Director: <span>{movies.director}</span>
                </p>
                <p>
                  Rating: <span>{movies.ratings}</span>
                </p>
                <p>
                  Release: <span>{movies.releasedate}</span>
                </p>
              </div>
            </div>
            <div className="row">
              <div className="vedio">
                <ReactPlayer controls url={movies.movietrailer} />
              </div>
              <div className="ticket-buttons">
                <h1>Buy Tickets</h1>
                {/* if user info is available then show the button to get the tickets with the id */}
                {auth ? (
                  <Link to={`/process/${movieId}`}>
                    <button>Get Tickets</button>
                  </Link>
                ) : (
                  <Link to="/process">
                    <button>Get Ticket</button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="containers">
              <Slider />
            </div>
            <div className="movie-info">
              <div className="containerd">
                {Array.from(state).map((value, index) => {
                  return (
                    <div className="rows" key={index}>
                      <div className="image">
                        <img src={value.image} alt={value.movietitle} />
                      </div>
                      <div className="infos">
                        <h2>{value.movietitle}</h2>
                        <h2>{value.duration}</h2>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
        <Footer />
      </div>
    </>
  );
};

export default Movies;
